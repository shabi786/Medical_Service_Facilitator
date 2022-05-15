from flask_restful import Resource, reqparse
from flask_jwt_simple import jwt_required, get_jwt
from database.models import Appointment, User, Doctor, AppointmentDetail, HospitalAdmin
from datetime import datetime
from math import ceil


class AppointmentCreate(Resource):
    @jwt_required
    def get(self):
        jwt = get_jwt()
        user = jwt.get('sub', {})
        email = user.get('email', '')
        user_type = user.get('type')
        if user_type not in ["user", 'hospital_admin']:
            return {"success": False, "message": "Only user or hospital admin can see this"}
        if user_type == 'user':
            user = User.objects(email=email)
        else:
            user = HospitalAdmin.objects(email=email)
        if not user:
            return {
                "success": False,
                "message": "No user exists"
            }
        user = user[0]
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, default=1)
        parser.add_argument('closed', type=bool, default=False)
        params = parser.parse_args()
        page = params.page
        print(user.email, params.closed, user_type)
        if user_type == 'user':
            total_appointments = Appointment.objects(patient=user.email, closed=params.closed).count()
            appointments = Appointment.objects(patient=user.email, closed=params.closed).order_by('-nextAppointment')[(page - 1) * 10: page * 10]
            print(appointments)
        else:
            total_appointments = Appointment.objects(hospital=user.hospital.id, closed=params.closed).count()
            appointments = Appointment.objects(hospital=user.hospital.id, closed=params.closed).order_by('-nextAppointment')[(page - 1) * 10: page * 10]

        return {
            "success": True,
            "totalAppointments": total_appointments,
            "totalPages": ceil(total_appointments / 10),
            "page": page,
            "appointments": [appointment.format() for appointment in appointments]
        }

    @jwt_required
    def post(self):
        jwt = get_jwt()
        user = jwt.get('sub', {})
        email = user.get('email', '')
        if user.get('type', "") != 'user':
            return {"success": False, "message": "Only users can book an appointment"}
        exists = User.objects(email=email)
        if not exists:
            return {
                "success": False,
                "message": "No user exists"
            }
        parser = reqparse.RequestParser()
        parser.add_argument('hospital', type=str)
        parser.add_argument('date', type=str)
        body = parser.parse_args()
        if not (body.hospital and body.date):
            return {
                "success": False,
                "message": "Hospital or date missing"
            }
        else:
            creation_date = datetime.now()
            next_appointment = datetime.strptime(body.date, '%d/%m/%Y %H:%M')
            if next_appointment <= creation_date:
                return {"success": False, "message": "Appointment cannot be made to past"}
            appointment = Appointment(hospital=body.hospital, creationDate=creation_date,
                                      nextAppointment=next_appointment, patient=exists[0])
            appointment.save()
            return {
                'success': True,
                'appointment': appointment.format()
            }


class AppointmentActions(Resource):
    def get_user(self, jwt):
        print(jwt)
        user = jwt.get('sub', {})
        email = user.get('email', '')
        if user.get('type') == 'doctor':
            doctor = Doctor.objects.get(email=email)
            if not doctor:
                return [False, "Doctor does not exist"]
            if not doctor.approved:
                return [False, "Doctor is not approved. Contact hospital admin"]
            return ['doctor', doctor]
        elif user.get('type') == 'user':
            u = User.objects.get(email=email)
            return ['user', u]
        elif user.get('type') == 'hospital_admin':
            admin = HospitalAdmin.objects.get(email=email)
            if not admin.approved:
                return [False, "Doctor is not approved. Contact hospital admin"]
            return ['hospital_admin', admin]
        return [False, 'Unauthorized']

    def get_appointment(self, appointment_id):
        if appointment_id is None:
            [False, "Appointment id missing"]
        try:
            appointment = Appointment.objects.get(id=appointment_id)
            return [True, appointment]
        except Exception as e:
            return [False, "Invalid Appointment"]

    @jwt_required
    def get(self, appointment_id):
        try:
            user = self.get_user(get_jwt())
            if not user[0]:
                return {"success": False, "message": user[1]}
            user_type, user = user
            appointment = self.get_appointment(appointment_id)
            if not appointment[0]:
                return {"success": False, "message": appointment[1]}
            appointment = appointment[1]
            if user_type == 'user':
                if appointment.patient.email == user.email:
                    return {"success": True, "appointment": appointment.format()}
            elif str(appointment.hospital.id) == str(user.hospital.id):
                return {"success": True, "appointment": appointment.format()}
            else:
                return {"success": False, "message": "Unauthorized"}

        except Exception as e:
            print(e)
            return {
                "success": False,
                "error": "Something went wrong"
            }

    @jwt_required
    def post(self, appointment_id):
        try:
            user = self.get_user(get_jwt())
            if not user[0]:
                return {"success": False, "message": user[1]}
            user_type, user = user
            if user_type != "doctor":
                return {"success": False, "message": "Only doctors can perform this action"}
            parser = reqparse.RequestParser()
            parser.add_argument('fees', type=float, default=0.0)
            parser.add_argument('unpaid', type=float, default=0.0)
            parser.add_argument('remarks', type=str, default=None)
            parser.add_argument('next_date', type=str)
            parser.add_argument('monitoring', type=dict, default={})
            query_param = parser.parse_args()
            if query_param.remarks is None or query_param.next_date is None:
                return {
                    "success": False,
                    "message": "Remarks or Next Appointment date is missing"
                }
            next_appointment = datetime.strptime(query_param.next_date, '%d/%m/%Y %H:%M')
            if next_appointment < datetime.now():
                return {"success": False, "message": "Next appointment cannot be in past"}
            appointment = self.get_appointment(appointment_id)
            if not appointment[0]:
                return {"success": False, "message": appointment[1]}
            appointment = appointment[1]
            if appointment.closed:
                return {"success": False, "message": "Appointment is closed"}
            if str(appointment.hospital.id) != str(user.hospital.id):
                return {"success": False, "message": "Unauthorized"}
            appointment.nextAppointment = next_appointment
            appointment_detail = AppointmentDetail(
                date=datetime.now(),
                doctor=str(user.email),
                fees=query_param.fees,
                unpaid=query_param.unpaid,
                remarks=query_param.remarks,
                monitoring=query_param.monitoring
            )
            appointment.appointments.append(appointment_detail)
            appointment.save()
            return {"success": True, "appointment": appointment.format()}

        except Exception as e:
            print(e)
            return {
                "success": False,
                "error": "Something went wrong"
            }
    @jwt_required
    def delete(self, appointment_id):
        print("Delete", appointment_id)
        try:
            user = self.get_user(get_jwt())
            if not user[0]:
                return {"success": False, "message": user[1]}
            user_type, user = user
            appointment = self.get_appointment(appointment_id)
            if not appointment[0]:
                return {"success": False, "message": appointment[1]}
            appointment = appointment[1]
            if user_type == "user":
                if len(appointment.appointments) > 0:
                    return {"success": False, "message": "Cannot be cancelled"}
                if appointment.patient.id != user.id:
                    return {"success": False, "message": "Unauthorized"}
                appointment.closedDate = datetime.now()
                appointment.closed = True
                appointment.save()
                return {"success": True, "message": "Appointment Cancelled"}
            elif user_type == "hospital_admin":
                if str(appointment.hospital.id) != str(user.hospital.id):
                    return {"success": False, "message": "Unauthorized"}
                appointment.closedDate = datetime.now()
                appointment.closed = True
                appointment.save()
                return {"success": True, "message": "Appointment Cancelled"}
            else:
                return {"success": False, "message": "Unauthorized"}
        except Exception as e:
            print(e)
            return {"success": False, "message": "Something went wrong"}


from flask_restful import Resource, reqparse
from flask_jwt_simple import jwt_required, get_jwt
from database.models import Doctor, SuperAdmin, HospitalAdmin
from mongoengine import DoesNotExist


class ApproveHospitalAdmins(Resource):
    def get_admin(self, jwt):
        user = jwt.get('sub')
        email = user.get('email', None)
        user_type = user.get('type', '')
        if email is None or user_type != 'super':
            return [False, "Unauthorized"]
        try:
            admin = SuperAdmin.objects.get(email=email)
            if not admin.approved:
                return [False, "Admin is not approved"]
            return [True, admin]
        except Exception as e:
            print(e)
            return [False, "User does not exist"]

    @jwt_required
    def get(self):
        try:
            data = self.get_admin(get_jwt())
            if not data[0]:
                return {"success": False, "message": data[1]}
            data = HospitalAdmin.objects(approved=False)
            return {"success": True, "unapproved": [
                {"email": h_admin.email, "name": h_admin.name, "hospital": h_admin.hospital.get_obj()} for h_admin in data]}
        except Exception as e:
            print(e)
            return {"success": False, "message": "Something went wrong"}

    @jwt_required
    def post(self):
        try:
            data = self.get_admin(get_jwt())
            if not data[0]:
                return {"success": False, "message": data[1]}
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            q = parser.parse_args()
            if q.email is None:
                return {"success": False, "message": "Email to approve is missing"}
            user = HospitalAdmin.objects.get(email=q.email)
            user.approved = True
            user.save()
            return {
                "success": True,
                "message": "{} is approved".format(user.email)
            }
        except DoesNotExist as e:
            return {"success": False, "message": "Invalid email"}
        except Exception as e:
            print(e)
            return {"success": False, "message": "Something went wrong"}

    @jwt_required
    def delete(self):
        try:
            data = self.get_admin(get_jwt())
            if not data[0]:
                return {"success": False, "message": data[1]}
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            q = parser.parse_args()
            if q.email is None:
                return {"success": False, "message": "Email to approve is missing"}
            user = HospitalAdmin.objects.get(email=q.email)
            user.delete()
            return {
                "success": True,
                "message": "{} is removed".format(user.email)
            }
        except DoesNotExist as e:
            return {"success": False, "message": "Invalid email"}
        except Exception as e:
            print(e)
            return {"success": False, "message": "Something went wrong"}

class ApproveDoctor(Resource):
    def get_admin(self, jwt):
        user = jwt.get('sub')
        email = user.get('email', None)
        user_type = user.get('type', '')
        if email is None or user_type != 'hospital_admin':
            return [False, "Unauthorized"]
        try:
            admin = HospitalAdmin.objects.get(email=email)
            if not admin.approved:
                return [False, "Admin is not approved"]
            return [True, admin]
        except Exception as e:
            print(e)
            return [False, "User does not exist"]

    @jwt_required
    def get(self):
        try:
            data = self.get_admin(get_jwt())
            if not data[0]:
                return {"success": False, "message": data[1]}
            data = Doctor.objects(approved=False)
            return {"success": True, "unapproved": [
                {"email": doctor.email, "name": doctor.name, "mobile": doctor.mobile} for doctor in data]}
        except Exception as e:
            print(e)
            return {"success": False, "message": "Something went wrong"}

    @jwt_required
    def post(self):
        try:
            data = self.get_admin(get_jwt())
            if not data[0]:
                return {"success": False, "message": data[1]}
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            q = parser.parse_args()
            if q.email is None:
                return {"success": False, "message": "Email to approve is missing"}
            user = Doctor.objects.get(email=q.email)
            user.approved = True
            user.save()
            return {
                "success": True,
                "message": "{} is approved".format(user.email)
            }
        except DoesNotExist as e:
            return {"success": False, "message": "Invalid email"}
        except Exception as e:
            print(e)
            return {"success": False, "message": "Something went wrong"}

    @jwt_required
    def delete(self):
        try:
            data = self.get_admin(get_jwt())
            if not data[0]:
                return {"success": False, "message": data[1]}
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            q = parser.parse_args()
            if q.email is None:
                return {"success": False, "message": "Email to approve is missing"}
            user = Doctor.objects.get(email=q.email)
            user.delete()
            return {
                "success": True,
                "message": "{} is deleted".format(user.email)
            }
        except DoesNotExist as e:
            return {"success": False, "message": "Invalid email"}
        except Exception as e:
            print(e)
            return {"success": False, "message": "Something went wrong"}




class ApproveSuperAdmins(Resource):
    def get_admin(self, jwt):
        user = jwt.get('sub')
        email = user.get('email', None)
        user_type = user.get('type', '')
        if email is None or user_type != 'super':
            return [False, "Unauthorized"]
        try:
            admin = SuperAdmin.objects.get(email=email)
            if not admin.approved:
                return [False, "Admin is not approved"]
            return [True, admin]
        except Exception as e:
            print(e)
            return [False, "User does not exist"]

    @jwt_required
    def get(self):
        try:
            data = self.get_admin(get_jwt())
            if not data[0]:
                return {"success": False, "message": data[1]}
            data = SuperAdmin.objects(approved=False)
            return {"success": True, "unapproved": [{"email": admin.email} for admin in data]}
        except Exception as e:
            print(e)
            return {"success": False, "message": "Something went wrong"}

    @jwt_required
    def post(self):
        try:
            data = self.get_admin(get_jwt())
            if not data[0]:
                return {"success": False, "message": data[1]}
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            q = parser.parse_args()
            if q.email is None:
                return {"success": False, "message": "Email to approve is missing"}
            user = SuperAdmin.objects.get(email=q.email)
            user.approved = True
            user.save()
            return {
                "success": True,
                "message": "{} is approved".format(user.email)
            }
        except DoesNotExist as e:
            return {"success": False, "message": "Invalid email"}
        except Exception as e:
            print(e)
            return {"success": False, "message": "Something went wrong"}

    @jwt_required
    def delete(self):
        try:
            data = self.get_admin(get_jwt())
            if not data[0]:
                return {"success": False, "message": data[1]}
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            q = parser.parse_args()
            if q.email is None:
                return {"success": False, "message": "Email to approve is missing"}
            user = SuperAdmin.objects.get(email=q.email)
            user.delete()
            return {
                "success": True,
                "message": "{} is deleted".format(user.email)
            }
        except DoesNotExist as e:
            return {"success": False, "message": "Invalid email"}
        except Exception as e:
            print(e)
            return {"success": False, "message": "Something went wrong"}
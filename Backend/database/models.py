from .db import db
from mongoengine.fields import StringField, EmailField, DateTimeField, ReferenceField,\
    BooleanField, FloatField, DictField, EmbeddedDocumentListField, IntField, ListField
from datetime import datetime


class Hospital(db.Document):
    name = StringField(required=True)
    address = StringField(required=True)
    location = StringField(required=True)
    pincode = IntField(required=True)
    landline = StringField()
    state = StringField()
    district = StringField()
    mobile = StringField()
    emergency = StringField()
    rating = FloatField(default=0.0)
    rating_count = IntField(default=0)

    def get_obj(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "address": self.address,
            "location": self.location,
            "pincode": self.pincode,
            "landline": self.landline,
            "state": self.state,
            "district": self.district,
            "mobile": self.mobile,
            "emergency": self.emergency
        }


class Doctor(db.Document):
    email = EmailField(required=True, primary_key=True)
    hospital = ReferenceField(Hospital, required=True)
    password = StringField(required=True)
    approved = BooleanField(default=False)
    name = StringField(required=True)
    mobile = StringField(required=True)
    skills = ListField(field=StringField(), default=[])
    def format(self):
        return {
            "email": str(self.email),
            "name": self.name,
            "hospital": str(self.hospital.id),
            "approved": self.approved,
            "mobile": self.mobile
        }


class AppointmentDetail(db.EmbeddedDocument):
    date = DateTimeField()
    doctor = StringField()
    fees = FloatField(default=0.0)
    unpaid = FloatField(default=0.0)
    remarks = StringField()
    monitoring = DictField()

    def format(self):
        return {
            "date": self.date.strftime("%d/%m/%Y, %H:%M:%S"),
            "doctor": self.doctor,
            "fees": self.fees,
            "unpaid": self.fees,
            "remarks": self.remarks,
            "monitoring": self.monitoring
        }


class User(db.Document):
    name = StringField(required=True)
    email = EmailField(required=True, primary_key=True)
    password = StringField(required=True)
    dob = DateTimeField(required=True)
    mobile = StringField(required=True)

    def format(self):
        return {
            "name": self.name,
            "email": self.email,
            "dob": datetime.strftime(self.dob, '%d/%m/%Y'),
            "mobile": self.mobile
        }


class Appointment(db.Document):
    creationDate = DateTimeField(required=True)
    closedDate = DateTimeField()
    nextAppointment = DateTimeField(required=True)
    hospital = ReferenceField(Hospital, required=True)
    patient = ReferenceField(User, required=True)
    closed = BooleanField(default=False)
    appointments = EmbeddedDocumentListField(AppointmentDetail, default=[])

    def format(self):
        response = {
            "id": str(self.id),
            "creationDate": datetime.strftime(self.creationDate, '%d/%m/%Y %H:%M'),
            "nextAppointment": datetime.strftime(self.nextAppointment, '%d/%m/%Y %H:%M'),
            "hospital": self.hospital.get_obj(),
            "patient": self.patient.format(),
            "closed": self.closed,
            "visits": [appointment.format() for appointment in self.appointments],
            "cancellable": len(self.appointments) == 0

        }
        if self.closedDate:
            response["closedDate"] = datetime.strftime(self.closedDate, '%d/%m/%Y %H:%M')
        return response


class HospitalAdmin(db.Document):
    email = EmailField(primary_key=True)
    password = StringField(required=True)
    hospital = ReferenceField(Hospital, required=True)
    approved = BooleanField(default=False)
    name = StringField(required=True)

    def format(self):
        return {
            "email": self.email,
            "name": self.name,
            "hospital": str(self.hospital.id),
            "approved": self.approved
        }


class SuperAdmin(db.Document):
    email = EmailField(required=True, primary_key=True)
    password = StringField(required=True)
    approved = BooleanField(default=False)

    def format(self):
        return {
            "email": self.email,
            "approved": self.approved
        }
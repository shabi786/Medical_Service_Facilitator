from flask import Flask
from flask_restful import Api
from controllers.hospital import HospitalController, SearchHopsitalByName
from controllers.auth import Login, Signup, LoginDoctor, SignupDoctor, LoginHospitalAdmin, \
    SignupHospitalAdmin, LoginSuperAdmin, SignupSuperAdmin
from controllers.predictor import Predictor, Symptoms, Disease
from controllers.appointment import AppointmentCreate, AppointmentActions
from controllers.approve import ApproveHospitalAdmins, ApproveDoctor, ApproveSuperAdmins
from controllers.doctor import DoctorActions
from helpers.helpers import initialise_helpers
from database.db import initialize_db
from os import getenv
from datetime import timedelta
app = Flask(__name__, static_folder="assets")


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
    return response


app.config['JWT_SECRET_KEY'] = getenv("SECRET_KEY")
app.config['JWT_EXPIRES'] = timedelta(365)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False
app.config['JWT_ERROR_MESSAGE_KEY'] = 'message'
app.config['MONGODB_SETTINGS'] = {
    'host': getenv("DATABASE_URL")
}
initialize_db(app)
initialise_helpers(app)
api = Api(app)
api.add_resource(Login, '/login/user')
api.add_resource(Signup, '/signup/user')
api.add_resource(LoginDoctor, '/login/doctor')
api.add_resource(SignupDoctor, '/signup/doctor')
api.add_resource(LoginHospitalAdmin, '/login/hospital-admin')
api.add_resource(SignupHospitalAdmin, '/signup/hospital-admin')
api.add_resource(LoginSuperAdmin, '/login/super-admin')
api.add_resource(SignupSuperAdmin, '/signup/super-admin')

api.add_resource(HospitalController, '/hospitals')
api.add_resource(SearchHopsitalByName, '/search')
api.add_resource(Predictor, '/predict')

api.add_resource(AppointmentCreate, '/appointments')
api.add_resource(AppointmentActions, '/appointment/<appointment_id>')
api.add_resource(ApproveHospitalAdmins, '/approve/hospital-admins')
api.add_resource(ApproveDoctor, '/approve/doctors')
api.add_resource(ApproveSuperAdmins, '/approve/super-admins')
api.add_resource(Symptoms, '/symptoms')
api.add_resource(Disease, '/disease')

api.add_resource(DoctorActions, '/skills')
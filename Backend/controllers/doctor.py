from flask_restful import Resource, reqparse
from database.models import Doctor
from flask_jwt_simple import jwt_required, get_jwt


class DoctorActions(Resource):

    def get_doctor(self, jwt):
        user = jwt.get('sub')
        email = user.get('email', None)
        user_type = user.get('type', None)
        if not email or user_type != 'doctor':
            return [False, "Unauthorized"]
        doctor = Doctor.objects.get(email=email)
        if doctor is None:
            return [False, "Doctor does not exist"]
        return [True, doctor]

    @jwt_required
    def get(self):
        res = self.get_doctor(get_jwt())
        print(res)
        if not res[0]:
            return {"success": False, "message": res[1]}
        doctor = res[1]
        return {"success": True, "skills": doctor.skills}

    @jwt_required
    def post(self):
        try:
            res = self.get_doctor(get_jwt())
            if not res[0]:
                return {"success": False, "message": res[1]}
            doctor = res[1]
            parser = reqparse.RequestParser()
            parser.add_argument('skills', type=str, default='')
            query_param = parser.parse_args()
            skills = query_param.skills
            if len(skills) == 0:
                return {"success": False, "message": "Skills is required"}
            skills = list(set(skills.split(',')))
            print(skills)
            doctor.skills = skills
            doctor.save()
            return {"success": True, "skills": skills}
        except Exception as e:
            print(e)
            return {"success": False, "message": "Something went wrong"}
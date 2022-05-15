from flask_restful import Resource, reqparse
from database.models import User, Hospital, Doctor, HospitalAdmin, SuperAdmin
from mongoengine import ValidationError, DoesNotExist
from flask_jwt_simple import create_jwt
import datetime
from helpers.helpers import generate_hash, check_hash
from helpers.validation import valid_email, valid_password

class Login(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            parser.add_argument("password", type=str)
            q = parser.parse_args()
            if q.email is None or q.password is None:
                return {
                    "success": False,
                    "message": "Email or password is missing"
                }

            elif not valid_email(q.email):
                return {
                    "success": False,
                    "message": "Invalid email"
                }
            elif not valid_password(q.password):
                return {
                    "success": False,
                    "message": "Password should be of length atleast 6 letters"
                }
            else:
                try:
                    email = q.email.lower()
                    user = User.objects.get(email=email)
                    valid = check_hash(q.password, user.password)
                    if valid:
                        return {
                            "success": True,
                            "token": create_jwt({"email": user.email, "type": "user"}),
                            "user": user.format()
                        }
                    else:
                        return {
                            "success": False,
                            "message": "Invalid Credentials"
                        }
                except Exception as e:
                    print(e)
                    return {
                        "success": False,
                        "message": "Invalid Credentials"
                    }
        except Exception as e:
            print(e)


class Signup(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            parser.add_argument("password", type=str)
            parser.add_argument("name", type=str)
            parser.add_argument("dob", type=str)
            parser.add_argument("mobile", type=str)
            q = parser.parse_args()
            if q.email is None or q.password is None or q.name is None or q.dob is None or q.mobile is None:
                return {
                    "success": False,
                    "message": "Email, password, name, mobile or date of birth is missing"
                }
            else:
                user_count = User.objects(email=q.email).count()
                if user_count > 0:
                    return {
                        "success": False,
                        "message": "User already exists"
                    }
                else:
                    password = generate_hash(q.password)
                    try:
                        dob = datetime.datetime.strptime(q.dob, '%d/%m/%Y')
                    except:
                        return {"success": False, "message": "Invalid date of birth. Please keep the format of dd/mm/yyyy"}
                    user = User(email=q.email, password=password, name=q.name, dob=dob, mobile=q.mobile)
                    user.save()
                    return {
                        "success": True,
                        "token": create_jwt({"email": user.email, "type": "user"}),
                        "user": user.format()
                    }
        except ValidationError as e:
            errors = list(e.to_dict())
            message = "Invalid " + ", ".join(errors)
            return {
                "success": False,
                "message": message
            }
        except Exception as e:
            print(e)
            return {
                "success": False,
                "message": "Something went wrong"
            }

class LoginDoctor(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            parser.add_argument("password", type=str)
            q = parser.parse_args()
            if q.email is None or q.password is None:
                return {
                    "success": False,
                    "message": "Email or Password is missing"
                }
            try:
                doctor = Doctor.objects.get(email=q.email)
                valid = check_hash(q.password, doctor.password)
                if valid:
                    return {
                        "success": True,
                        "token": create_jwt({"email": doctor.email, "type": "doctor"}),
                        "doctor": doctor.format()
                    }
                else:
                    return {
                        "success": False,
                        "message": "Invalid Credentials"
                    }
            except Exception as e:
                print(e)
                return {
                    "success": False,
                    "message": "Invalid Credentials"
                }
        except Exception as e:
            print(e)
            return {
                "success": False,
                "message": "Something went wrong. Please try again later"
            }


class SignupDoctor(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            parser.add_argument("password", type=str)
            parser.add_argument("hospital", type=str)
            parser.add_argument("name", type=str)
            parser.add_argument("mobile", type=str)
            q = parser.parse_args()
            if q.email is None or q.password is None or q.hospital is None or q.name is None or q.mobile is None:
                return {
                    "success": False,
                    "message": "Email, password, name, mobile or hospital is missing"
                }
            doctor_count = Doctor.objects(email=q.email).count()
            if doctor_count > 0:
                return {
                    "success": False,
                    "message": "Doctor already exists"
                }
            password = generate_hash(q.password)
            doctor = Doctor(email=q.email, password=password, hospital=q.hospital, name=q.name, mobile=q.mobile)
            doctor.save()
            return {
                "success": True,
                "token": create_jwt({"email": doctor.email, "type": "doctor"}),
                "doctor": doctor.format()
            }
        except ValidationError as e:
            errors = list(e.to_dict())
            message = "Invalid " + ", ".join(errors)
            return {
                "success": False,
                "message": message
            }
        except DoesNotExist as e:
            doctor.delete()
            return {
                "success": False,
                "message": "Invalid hospital id"
            }
        except Exception as e:
            print(e)
            return {
                "success": False,
                "message": "Something went wrong"
            }


class LoginHospitalAdmin(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            parser.add_argument("password", type=str)
            q = parser.parse_args()
            if q.email is None or q.password is None:
                return {
                    "success": False,
                    "message": "Email and password is required"
                }
            user = HospitalAdmin.objects.get(email=q.email)
            if not user:
                return {
                    "success": False,
                    "message": "Invalid credentials"
                }
            valid = check_hash(q.password, user.password)
            if valid:
                return {
                    "success": True,
                    "token": create_jwt({"email": user.email, "type": "hospital_admin"}),
                    "hospital_admin": user.format()

                }
            else:
                return {
                    "success": False,
                    "message": "Invalid Credentials"
                }
        except DoesNotExist as e:
            return {
                "success": False,
                "message": "Invalid Credentials"
            }
        except Exception as e:
            print(e)
            print(type(e))
            return {
                "success": False,
                "message": "Something went wrong"
            }


class SignupHospitalAdmin(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            parser.add_argument("password", type=str)
            parser.add_argument("hospital", type=str)
            parser.add_argument("name", type=str)
            q = parser.parse_args()
            if q.email is None or q.password is None or q.hospital is None or q.name is None:
                return {
                    "success": False,
                    "message": "Email, password, name and hospital is required"
                }
            user = HospitalAdmin.objects(email=q.email)
            if user:
                return {
                    "success": False,
                    "message": "User already exists"
                }
            hospital = Hospital.objects.get(id=q.hospital)
            if not hospital:
                raise DoesNotExist()
            password = generate_hash(q.password)
            user = HospitalAdmin(email=q.email, hospital=q.hospital, password=password, name=q.name)
            user.save()
            return {
                    "success": True,
                    "token": create_jwt({"email": user.email, "type": "hospital_admin"}),
                    "hospital_admin": user.format()
            }

        except DoesNotExist as e:
            print(e)
            return {
                "success": False,
                "message": "Invalid hospital ID"
            }
        except ValidationError as e:
            print(e)
            return {
                "success": False,
                "message": "Invalid hospital ID"
            }
        except Exception as e:
            print(e)
            print(type(e))
            return {
                "success": False,
                "message": "Something went wrong"
            }


class LoginSuperAdmin(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            parser.add_argument("password", type=str)
            q = parser.parse_args()
            if q.email is None or q.password is None:
                return {
                    "success": False,
                    "message": "Email and password is required"
                }
            user = SuperAdmin.objects.get(email=q.email)
            valid = check_hash(q.password, user.password)
            if valid:
                return {
                    "success": True,
                    "token": create_jwt({"email": user.email, "type": "super"}),
                    "super_admin": user.format()

                }
            else:
                return {
                    "success": False,
                    "message": "Invalid Credentials"
                }
        except DoesNotExist as e:
            return {
                "success": False,
                "message": "User does not exist"
            }
        except Exception as e:
            print(e)
            print(type(e))
            return {
                "success": False,
                "message": "Something went wrong"
            }


class SignupSuperAdmin(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("email", type=str)
            parser.add_argument("password", type=str)
            q = parser.parse_args()
            if q.email is None or q.password is None:
                return {
                    "success": False,
                    "message": "Email and password is required"
                }
            user = SuperAdmin.objects(email=q.email)
            if user:
                return {
                    "success": False,
                    "message": "User already exists"
                }
            password = generate_hash(q.password)
            user = SuperAdmin(email=q.email, password=password)
            user.save()
            return {
                    "success": True,
                    "token": create_jwt({"email": user.email, "type": "super"}),
                    "super_admin": user.format()
            }

        except DoesNotExist as e:
            print(e)
            return {
                "success": False,
                "message": "Invalid credentials"
            }
        except ValidationError as e:
            return {
                "success": False,
                "message": "Invalid credentials"
            }
        except Exception as e:
            print(e)
            return {
                "success": False,
                "message": "Something went wrong"
            }
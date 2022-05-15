# Endpoints

Note: Some endpoints are protected by JWT. To use authentication, send token in Authorization Header as Bearer

## Overview

<hr />

### Authentication Routes

POST /login/user: To Login as User

POST /signup/user: To Signup as User

POST /login/doctor: To Login as Doctor

POST /signup/doctor: To Signup as Doctor

POST /login/hospital-admin: To Login as Administrator of Hospital

POST /signup/hospital-admin: To Signup as Administrator of Hospital

POST /login/super-admin: To Login as Super Administrator

POST /signup/super-admin: To Signup as Super Administrator

<hr />

### Hospital Routes (JWT Required)

GET /hospitals: Get list of hospitals

POST /hospitals: Add new hospital (Super Admin Access)

<hr />

### Prediction Routes (JWT Required)

GET /predict: Get prediction for disease

<hr />

### Appointment Routes (JWT Required)

GET /appointments: Get all appointments made by user

POST /appointments: Create new appointment

GET /appointment/<appointment_id>: Get Details of Appointment with given appointment id

POST /appointment/<appointment_id>: Add new appointment detail to given appointment (Doctors only)

DELETE /appointment/<appointment_id>: Close the appointment (Patient or Hospital Admin)

<hr />

### Approval Routes(JWT Required)

GET /approve/doctors: Get list of doctors to be approved for given hospital

POST /approve/doctors: Approve the doctor

GET /approve/hospital-admins: Get list of hospital admins to be approved

POST /approve/hospital-admins: Approve Hospital Admin

GET /approve/super-admins: Get list of super admins to be approved

POST /approve/super-admins: Approve Super Admin

<hr />

## Detailed Guide

<hr />

### POST /login/user

Login for user

Request Params: None

Request Body:

1. email: string, mandatory
2. password: string, mandatory

Response: JSON Response containing fields

1. success: Boolean representing whether authentication was successful or not
2. message: Present only when success is false. Shows message regarding failure
3. token: JWT for further authentication
4. user : JSON Object containing details of user. It has following fields
    1. name: Name of user
    2. email: Email of user
    3. dob: Date of birth of user
    4. mobile: mobile number of user in string

#### Sample Request

Body:

    { "email" : "test@test.com", "password": "test" }

Response (success):

    {
        "success": true,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTY0Njc2NzIsImlhdCI6MTU5NjQ2NDA3MiwibmJmIjoxNTk2NDY0MDcyLCJzdWIiOiJ0ZXN0QHRlc3QuY29tIn0.fNoNucYxYaqyoQYpIgNVcRWVa5FY2_RWweAkR25kRl4",
        "user": {
            "name": "Test User",
            "email": "test@test.com",
            "dob": "31/01/1990",
            "mobile": "9xxxxxxx"
        }
    }

Response (failure):

    {
        "success": false,
        "message": "Invalid Credentials"
    }

<hr />

### POST /signup/user

Used to create new account (for patients)

Request Params: None

Request Body:

1. email: string, unique and mandatory
2. password: string, mandatory
3. dob: string, format dd/mm/yyyy only. Mandatory
4. name: string, mandatory
5. mobile: string, mandatory

Response: Same JSON Object as login

#### Sample Request

Body:

    {
        "email": "test@test.com",
        "password": "test",
        "dob": "31/01/1990",
        "name": "Test User",
        "mobile": "9xxxxxxx"
    }

Response (success):

    {
        "success": true,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTY0Njc2NzIsImlhdCI6MTU5NjQ2NDA3MiwibmJmIjoxNTk2NDY0MDcyLCJzdWIiOiJ0ZXN0QHRlc3QuY29tIn0.fNoNucYxYaqyoQYpIgNVcRWVa5FY2_RWweAkR25kRl4",
        "user": {
            "name": "Test User",
            "email": "test@test.com",
            "dob": "31/01/1990",
            "mobile": "9xxxxxxx"
        }
    }

Response (failure):

    {
        "success": false,
        "message": "User already exists"
    }

<hr />

### POST /login/doctor

Login for doctor

Request Params: None

Request Body:
1. email: string, mandatory
2. password: string, mandatory

Response: JSON Response containing fields
1. success: Boolean representing whether authentication was successful or not
2. message: Present only when success is false. Shows message regarding failure
3. token: JWT for further authentication
4. doctor : JSON Object containing details of user. It has following fields
    1. name: Name of doctor
    2. email: Email of doctor
    3. hospital: ID of hospital in which doctor works
    4. approved: Boolean representing whether doctor is authorized by Hospital Admin,
    5. mobile: string, mobile number of doctor

#### Sample Request
Body:

    { "email" : "test@test.com", "password": "test" }
    
Response (success):
    
    {
        "success": true,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTY0Njc2NzIsImlhdCI6MTU5NjQ2NDA3MiwibmJmIjoxNTk2NDY0MDcyLCJzdWIiOiJ0ZXN0QHRlc3QuY29tIn0.fNoNucYxYaqyoQYpIgNVcRWVa5FY2_RWweAkR25kRl4",
        "doctor": {
            "name": "Test User",
            "email": "test@test.com",
            "hospital": "5f265c5898966e300eb04824",
            "approved": false
        }
    }

Response (failure):

    {
        "success": false,
        "message": "Invalid Credentials"
    }

<hr />

#### POST /signup/doctor

Used to create new account (for doctor)

Request Params: None

Request Body:
1. email: string, unique and mandatory
2. password: string, mandatory
3. hospital: string, valid ID of any hospital. Mandatory
4. name: string, mandatory
5. mobile: string, mandatory

Response: Same JSON Object as login

#### Sample Request

Body: 
    
    {
	    "email": "test@test.com",
	    "password": "test",
	    "hospital": "5f265c5898966e300eb04824",
	    "name": "Test User"
    }

Response (success):
    
    {
        "success": true,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTY0Njc2NzIsImlhdCI6MTU5NjQ2NDA3MiwibmJmIjoxNTk2NDY0MDcyLCJzdWIiOiJ0ZXN0QHRlc3QuY29tIn0.fNoNucYxYaqyoQYpIgNVcRWVa5FY2_RWweAkR25kRl4",
        "doctor": {
            "name": "Test User",
            "email": "test@test.com",
            "hospital": "5f265c5898966e300eb04824",
            "approved": false,
            "mobile": "9xxxxxxx"
            
        }
    }

Response (failure):

    {
        "success": false,
        "message": "User already exists"
    }
 
 <hr />

 #### POST /login/hospital-admin
Login for Hospital Admin

Request Params: None

Request Body:
1. email: string, mandatory
2. password: string, mandatory

Response: JSON Response containing fields
1. success: Boolean representing whether authentication was successful or not
2. message: Present only when success is false. Shows message regarding failure
3. token: JWT for further authentication
4. hospital_admin : JSON Object containing details of user. It has following fields
    1. name: Name of admin
    2. email: Email of admin
    3. hospital: ID of hospital in which admin works
    4. approved: Boolean representing whether admin is approved

#### Sample Request
Body:

    { "email" : "test@test.com", "password": "test" }
    
Response (success):
    
    {
        "success": true,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTY0Njc2NzIsImlhdCI6MTU5NjQ2NDA3MiwibmJmIjoxNTk2NDY0MDcyLCJzdWIiOiJ0ZXN0QHRlc3QuY29tIn0.fNoNucYxYaqyoQYpIgNVcRWVa5FY2_RWweAkR25kRl4",
        "hospital_admin": {
            "name": "Test User",
            "email": "test@test.com",
            "hospital": "5f265c5898966e300eb04824",
            "approved": false
        }
    }

Response (failure):

    {
        "success": false,
        "message": "Invalid Credentials"
    }

<hr />

#### POST /signup/hospital-admin
Used to create new account (for hospital admin)

Request Params: None

Request Body:
1. email: string, unique and mandatory
2. password: string, mandatory
3. hospital: string, valid ID of any hospital. Mandatory
4. name: string, mandatory

Response: Same JSON Object as login

#### Sample Request
Body: 
    
    {
	    "email": "test@test.com",
	    "password": "test",
	    "hospital": "5f265c5898966e300eb04824",
	    "name": "Test User"
    }

Response (success):
    
    {
        "success": true,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTY0Njc2NzIsImlhdCI6MTU5NjQ2NDA3MiwibmJmIjoxNTk2NDY0MDcyLCJzdWIiOiJ0ZXN0QHRlc3QuY29tIn0.fNoNucYxYaqyoQYpIgNVcRWVa5FY2_RWweAkR25kRl4",
        "hospital_admin": {
            "name": "Test User",
            "email": "test@test.com",
            "hospital": "5f265c5898966e300eb04824",
            "approved": false
        }
    }

Response (failure):

    {
        "success": false,
        "message": "User already exists"
    }

<hr />

#### POST /login/super-admin
Login for super admin

Request Params: None

Request Body:
1. email: string, mandatory
2. password: string, mandatory

Response: JSON Response containing fields
1. success: Boolean representing whether authentication was successful or not
2. message: Present only when success is false. Shows message regarding failure
3. token: JWT for further authentication
4. super-admin : JSON Object containing details of user. It has following fields
    1. email: Email of super admin
    2. approved: Boolean representing whether super admin is verified

#### Sample Request
Body:

    { "email" : "test@test.com", "password": "test" }
    
Response (success):
    
    {
        "success": true,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTY0Njc2NzIsImlhdCI6MTU5NjQ2NDA3MiwibmJmIjoxNTk2NDY0MDcyLCJzdWIiOiJ0ZXN0QHRlc3QuY29tIn0.fNoNucYxYaqyoQYpIgNVcRWVa5FY2_RWweAkR25kRl4",
        "super_admin": {
            "email": "test@test.com",
            "verified": false
        }
    }

Response (failure):

    {
        "success": false,
        "message": "Invalid Credentials"
    }

<hr />

#### POST /signup/super-admin
Used to create new account (for super admins)

Request Params: None

Request Body:
1. email: string, unique and mandatory
2. password: string, mandatory

Response: Same JSON Object as login

#### Sample Request
Body: 
    
    {
	    "email": "test@test.com",
	    "password": "test",
    }

Response (success):
    
    {
        "success": true,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTY0Njc2NzIsImlhdCI6MTU5NjQ2NDA3MiwibmJmIjoxNTk2NDY0MDcyLCJzdWIiOiJ0ZXN0QHRlc3QuY29tIn0.fNoNucYxYaqyoQYpIgNVcRWVa5FY2_RWweAkR25kRl4",
        "super-admin": {
            "email": "test@test.com",
            "verified": false
        }
    }

Response (failure):

    {
        "success": false,
        "message": "User already exists"
    }

 
 <hr />

#### GET /hospitals
Returns list of hospitals

Request Params:
1. page: For pagination of results, optional, default value is 1
2. district: Show hospitals for given district only. Optional
3. state: Show hospitals for given state only. Optional
4. pincode: Show hospitals nearby given pincode. Optional
5. maxResults: Max Hospitals in a given page. Optional, default value is 10

Request Body: None

Response: JSON Object containing following fields
1. success: Boolean representing whether request was successful
2. message: String showing why query failed. Present when success is false
3. page: Integer showing current page of result
4. totalPages: Integer showing totalPages which can be queried
5. totalRecords: Integer showing total hospitals found for given criteria
6. data: array of objects, each containing detail of hospital in JSON format. Each object has following fields:
    1. id: String containing unique ID of hospital
    2. name: String containing name of Hospital
    3. address: String containing address of Hospital
    4. location: String containing "latitude, longitude". May be empty string if location is unavailable
    5. pincode: Integer showing pincode of hospital
    6. landline: String containing landline number of hospital. May be "Not Available"
    7. state: String showing state in which hospital resides.
    8. district: String showing district of hospital
    9. mobile: String containing mobile number of hospital. May be "Not Available"
    10. emergency: String containing emergency contact of hospital. May be "Not Available"

#### Sample Request
URL: /hospitals?maxResult=2
Response:

    {
        "success": true,
        "page": 1,
        "totalPages": 14721,
        "totalRecords": 29442,
        "data": [
            {
                "id": "5f265c5898966e300eb04824",
                "name": "Chakraborty Multi Speciality Hospital",
                "address": "Near Dollygunj Junction",
                "location": "11.6357989, 92.7120575",
                "pincode": 744101,
                "landline": "03192 251971",
                "state": "Andaman and Nicobar Islands",
                "district": "South Andaman",
                "mobile": "Not Available",
                "emergency": "Not Available"
            },
            {
                "id": "5f265c5898966e300eb04825",
                "name": "Inhs Dhanvantri",
                "address": "Medical Board Office",
                "location": "11.8311681, 92.6586401",
                "pincode": 744101,
                "landline": "Not Available",
                "state": "Andaman and Nicobar Islands",
                "district": "South Andaman",
                "mobile": "Not Available",
                "emergency": "Not Available"
            }
        ]
    }

URL: /hospitals?pincode=208007&maxResults=1

Response: 
    
    {
        "success": true,
        "page": 1,
        "totalPages": 124,
        "totalRecords": 124,
        "data": [
            {
                "id": "5f265c6498966e300eb0afbd",
                "name": "Saral Nursing Home",
                "address": "OppositeThana Chakeri, Lal Bangla",
                "location": "",
                "pincode": 208007,
                "landline": "Not Available",
                "state": "Uttar Pradesh",
                "district": "Kanpur Nagar",
                "mobile": "Not Available",
                "emergency": "Not Available"
            }
        ]
    }
    
URL: /hospitals?pincode=208007&state=Goa

Response: 

    {
        "success": false,
        "message": "No data found"
    }

<hr />

#### POST /hospitals
Add new hospital, can only be done by super admins

Request Body: None

Request Body: 
1. name: string, name of the hospital. Required.
2. address: string, address of hospital. Required.
3. latitude: float, latitude of hospital. Required
4. longitude: float, longitude of hospital. Required
5. pincode: integer, pincode of hospital. Required.
6. state: string, Indian state in which hospital is present. Required.
7. district: string, district in which hospital is present. Required.
8. mobile: string, mobile number to contact hospital. Required.
9. landline: string, landline number of hospital. Optional.
10. emergency: string, emergency contact of hospital. Optional

Response: JSON Object containing following fields
1. success: Boolean representing whether request was successful
2. message: String showing why query failed. Present when success is false
3. hospital: Contains data of created hospital in JSON format. It has following fields:
    1. id: String containing unique ID of hospital
    2. name: String containing name of Hospital
    3. address: String containing address of Hospital
    4. location: String containing "latitude, longitude". May be empty string if location is unavailable
    5. pincode: Integer showing pincode of hospital
    6. landline: String containing landline number of hospital. May be "Not Available"
    7. state: String showing state in which hospital resides.
    8. district: String showing district of hospital
    9. mobile: String containing mobile number of hospital. May be "Not Available"
    10. emergency: String containing emergency contact of hospital. May be "Not Available"
    11. rating: Float representing rating of hospital

#### Sample Request
URL: /hospitals

Body:

    {
            "name": "Test Hospital",
            "address": "Dummy Address",
            "location": "11.6357989,92.7120575",
            "pincode": 200000,
            "landline": "03192 251xxx",
            "state": "Andaman and Nicobar Islands",
            "district": "South Andaman",
            "mobile": "9876543210",
            "emergency": "Not Available",
    }

Response:

    {
        "success": true,
        "hospital": {
                "id": "5f265c5898966e300eb04824",
                "name": "Test Hospital",
                "address": "Dummy Address",
                "location": "11.6357989,92.7120575",
                "pincode": 200000,
                "landline": "03192 251xxx",
                "state": "Andaman and Nicobar Islands",
                "district": "South Andaman",
                "mobile": "9876543210",
                "emergency": "Not Available",
                "rating": 0.0
            }
    }

<hr />

#### GET /predict

Request Params:
1. symptoms: String containing symptoms, each symptom separated by comma

Request Body: None

Response: JSON Object containing following fields
1. success: Boolean representing whether request was successful
2. message: String for message, present if success is false
3. disease: String showing disease predicted based on symptoms
    
#### Sample Request

URL: /predict

Response:
    
    {
        "success": false,
        "message": "Symptoms Missing"
    }

URL: /predict?symptoms=back_pain,neck_pain

Response:
    
    {
        "success": true,
        "disease": "Cervical spondylosis"
    }

<hr />

#### GET /appointments
Used to get the appointments made by user or appointments in hospital

If jwt of user is present, appointments of user will be given. If jwt of hospital admin is given, appointments of that hospital will be given.

Request Params:
1. closed, boolean to get closed appointments. Defaults to false

Request Body: None

Response: JSON Object containing following fields:
1. success: Boolean representing if request was successful or not
2. totalAppointments: Integer representing all appointments made by user
3. page: Integer for pagination
4. appointments: Array containing JSON object of each appointment. Each object has following fields:
    1. id: String showing unique id of appointment
    2. creationDate: String in format of "dd/mm/yyyy hh:mm", represents date of creation of appointment
    3. nextAppointment: String in format of "dd/mm/yyyy hh:mm", represents next date of appointment
    4. hospital: Object containing details of hospital in which appointment is made. See /hospitals route for this object's structure
    5. patient: Object containing details of patient. Contains name, email, dob
    6. closed: Boolean representing if case is closed
    7. visits: array containing detail of each appointment visit
    8. cancellable: Boolean representing if appointment can be cancelled by user
    9. closedDate: String in format of "dd/mm/yyyy hh:mm", present if appointment is closed

#### Sample Request

url: /appointments

Response:

    {
        "success": true,
        "totalAppointments": 1,
        "totalPages": 1,
        "page": 1,
        "appointments": [
            {
                "id": "5f28280a503a5c889ea1c41a",
                "creationDate": "03/08/2020 20:36",
                "nextAppointment": "20/08/2020 13:30",
                "hospital": {
                    "id": "5f265c5898966e300eb04824",
                    "name": "Chakraborty Multi Speciality Hospital",
                    "address": "Near Dollygunj Junction",
                    "location": "11.6357989, 92.7120575",
                    "pincode": 744101,
                    "landline": "03192 251971",
                    "state": "Andaman and Nicobar Islands",
                    "district": "South Andaman",
                    "mobile": "Not Available",
                    "emergency": "Not Available"
                },
                "patient": {
                    "name": "Test User",
                    "email": "test@test.com",
                    "dob": "31/08/1990",
                    "mobile": "9xxxxxxx"
                },
                "closed": false,
                "visits": [],
                "cancellable": false
            }
        ]
    }

<hr />

#### POST /appointments
Make new appointment to given hospital

Request Params: None
Request Body: JSON containing following fields:
1. hospital: Unique ID of hospital
2. date: Date of appointment in format "dd/mm/yyyy hh:mm"

Response Body: JSON Object containing following fields
1. success: Boolean representing whether request was successful
2. message: String in case success is false
3. appointment: Object showing detail of appointment, see GET /appointment for more info

#### Sample Request

Body: 
    
    {
	    "hospital": "5f265c5898966e300eb04824",
	    "date": "20/08/2020 13:30"
    }
    
Response Body:
    
    {
        "success": true,
        "appointment": {
            "id": "5f282aaa503a5c889ea1c41b",
            "creationDate": "03/08/2020 20:48",
            "nextAppointment": "20/08/2020 13:30",
            "hospital": {
                "id": "5f265c5898966e300eb04824",
                "name": "Chakraborty Multi Speciality Hospital",
                "address": "Near Dollygunj Junction",
                "location": "11.6357989, 92.7120575",
                "pincode": 744101,
                "landline": "03192 251971",
                "state": "Andaman and Nicobar Islands",
                "district": "South Andaman",
                "mobile": "Not Available",
                "emergency": "Not Available"
            },
            "patient": {
                "name": "Test User",
                "email": "test@test.com",
                "dob": "31/08/1990",
                "mobile": "9xxxxxxx"
            },
            "closed": false,
            "visits": [],
            "cancellable": false
        }
    }

<hr />

#### GET /appointment/<appointment_id>
Get Details of Appointment with given appointment id

Requires jwt of user, doctor or hospital admin

Request Params: None

Response Body: Object containing following keys

1. success: Boolean representing whether request was successful
2. message: String representing message of failure, present if success is false
3. appointment: Object showing detail of appointment, see GET /appointment for more info
#### Sample Requests

URL: /appointment/5f4fae4e3fcdef18810ea356

Response Body:
        
    {
        "success": true,
        "appointment": {
            "id": "5f4fae4e3fcdef18810ea356",
            "creationDate": "02/09/2020 20:08",
            "nextAppointment": "03/09/2020 13:30",
            "hospital": {
                "id": "5f265c5898966e300eb04824",
                "name": "Chakraborty Multi Speciality Hospital",
                "address": "Near Dollygunj Junction",
                "location": "11.6357989, 92.7120575",
                "pincode": 744101,
                "landline": "03192 251971",
                "state": "Andaman and Nicobar Islands",
                "district": "South Andaman",
                "mobile": "Not Available",
                "emergency": "Not Available"
            },
            "patient": {
                "name": "Test User",
                "email": "test@test.com",
                "dob": "24/08/1999",
                "mobile": "9xxxxxxx"
            },
            "closed": false,
            "visits": [
                {
                    "date": "03/09/2020, 10:11:29",
                    "doctor": "test@test.cam",
                    "fees": 0.0,
                    "unpaid": 0.0,
                    "remarks": "Good",
                    "monitoring": {}
                },
            ],
            "cancellable": false
        }
    }

<hr />

#### POST /appointment/<appointment_id>
Add new appointment detail to given appointment.
Requires jwt of Doctor only

Request Params: None

Request Body:
1. remarks: string representing remarks after visit, required
2. next_date: next date of visit, cannot be in past, required
3. fees: float representing fee of visit, optional
4. unpaid: float representing unpaid amount after visit, optional
5. monitoring: object (dictionary, hash map) containing data to monitor, optional 

Response Body: Object containing following fields
1. success: Boolean representing whether request was successful
2. message: String present if success is false, shows message regarding error
3. appointment: Object showing appointment detail

#### Sample Request
URL: POST /appointment/5f4fae4e3fcdef18810ea356

Request Body:
    
    {
        "date": "03/09/2020, 10:11:29",
        "doctor": "test@test.cam",
        "fees": 0.0,
        "unpaid": 0.0,
        "remarks": "Good",
        "monitoring": {
            "bp": "120/80",
            "blood sugar": 110   
         }
    }

Response Body:

    {
        "success": true,
        "appointment": {
            "id": "5f4fae4e3fcdef18810ea356",
            "creationDate": "02/09/2020 20:08",
            "nextAppointment": "03/09/2020 13:30",
            "hospital": {
                "id": "5f265c5898966e300eb04824",
                "name": "Test Hospital",
                "address": "Test Address",
                "location": "1x.6357989,9x.7120575",
                "pincode": 744xxx,
                "landline": "031xxxxxx",
                "state": "Andaman and Nicobar Islands",
                "district": "South Andaman",
                "mobile": "Not Available",
                "emergency": "Not Available"
            },
            "patient": {
                "name": "Test User",
                "email": "test@test.com",
                "dob": "20/08/1990",
                "mobile": "9xxxxxxx"
            },
            "closed": false,
            "visits": [
                {
                    "date": "03/09/2020, 10:11:29",
                    "doctor": "test@test.cam",
                    "fees": 0.0,
                    "unpaid": 0.0,
                    "remarks": "Good",
                    "monitoring": {
                        "bp": "120/80",
                        "blood sugar": 110   
                    }
                },
            ],
            "cancellable": false
        }
    }

<hr />

#### DELETE /appointment/<appointment_id>
Close the appointment (Patient or Hospital Admin)

Request Params: None

Request Body: None

Response Body: Object containing following fields
1. success: Boolean representing whether request was successful
2. message: String present if success is false, shows message regarding error
3. appointment: Object showing appointment detail

#### Sample Request
URL: POST /appointment/5f4fae4e3fcdef18810ea356

Response Body:

    {
        "success": true,
        "appointment": {
            "id": "5f4fae4e3fcdef18810ea356",
            "creationDate": "02/09/2020 20:08",
            "nextAppointment": "03/09/2020 13:30",
            "hospital": {
                "id": "5f265c5898966e300eb04824",
                "name": "Test Hospital",
                "address": "Test Address",
                "location": "1x.6357989,9x.7120575",
                "pincode": 744xxx,
                "landline": "031xxxxxx",
                "state": "Andaman and Nicobar Islands",
                "district": "South Andaman",
                "mobile": "Not Available",
                "emergency": "Not Available"
            },
            "patient": {
                "name": "Test User",
                "email": "test@test.com",
                "dob": "20/08/1990",
                "mobile": "9xxxxxxx"
            },
            "visits": [
                {
                    "date": "03/09/2020, 10:11:29",
                    "doctor": "test@test.cam",
                    "fees": 0.0,
                    "unpaid": 0.0,
                    "remarks": "Good",
                    "monitoring": {
                        "bp": "120/80",
                        "blood sugar": 110   
                    }
                },
            ],
            "cancellable": false,
            "closed": true,
            "closedDate": "03/09/2020 10:30"
        }
    }

<hr />

#### GET /approve/doctors
Get list of doctors to be approved for given hospital. Requires JWT of Hospital Admins

Request Params: None

Response Body: JSON Object containing following fields:
1. success: Boolean representing whether request was successful
2. message: String present if success is false. Contains message regarding failure
3. unapproved: Array contains JSON object of unapproved doctors. Each item of array contains
    1. email: String showing email of unapproved doctor
    2. name: String showing name of unapproved doctor
    3. mobile: String showing mobile of unapproved doctor

#### Sample Request
URL: /approve/doctors

Response Body:

    {
        "success": true,
        "unapproved": [
            { "email": test1@test.com", "name" : "Test 1", "mobile": "9xxxxxxx" },
            { "email": test2@test.com", "name" : "Test 2", "mobile": "9xxxxxxx" },
        ]
    }

#### POST /approve/doctors
Approve the doctor. Requires JWT of Hospital Admins

Request Body: 
1. email: string containing email of doctor to be approved

Response Body: JSON Object containing following fields:
1. success: Boolean representing whether request was successful
2. message: String showing message. Contains message regarding success or failure

#### Sample Request
URL: /approve/doctors

Request Body: 
    
    { "email": "test1@test.com"}

Response Body:
    
    {
        "success": true,
        "message": "test1@test.com is approved"
    }

#### DELETE /approve/doctors
Delete the unapproved doctor. Requires JWT of Hospital Admins

Request Body: 
1. email: string containing email of doctor to be deleted

Response Body: JSON Object containing following fields:
1. success: Boolean representing whether request was successful
2. message: String showing message. Contains message regarding success or failure

#### Sample Request
URL: /approve/doctors

Request Body: 
    
    { "email": "test1@test.com"}

Response Body:
    
    {
        "success": true,
        "message": "test1@test.com is deleted"
    }

<hr />

#### GET /approve/hospital-admins
Get list of hospital admins to be approved for given hospital. Requires JWT of Super Admin

Request Params: None

Response Body: JSON Object containing following fields:
1. success: Boolean representing whether request was successful
2. message: String present if success is false. Contains message regarding failure
3. unapproved: Array contains JSON object of unapproved hospital admins. Each item of array contains
    1. email: String showing email of hospital admin
    2. name: String showing name of hospital admin
    3. hospital: JSON object of hospital in which hospital admin has requested

#### Sample Request
URL: /approve/hospital-admins

Response Body:

    {
        "success": true,
        "unapproved": [
            { "email": test1@test.com", "name" : "Test 1", "hospital": {...} },
            { "email": test2@test.com", "name" : "Test 2", "hospital": {...} },
        ]
    }

#### POST /approve/hospital-admins
Approve the hospital admins. Requires JWT of Super Admins

Request Body: 
1. email: string containing email of hospital admin to be approved

Response Body: JSON Object containing following fields:
1. success: Boolean representing whether request was successful
2. message: String showing message. Contains message regarding success or failure

#### Sample Request
URL: /approve/hospital-admins

Request Body: 
    
    { "email": "test1@test.com"}

Response Body:
    
    {
        "success": true,
        "message": "test1@test.com is approved"
    }

#### DELETE /approve/hospital-admins
Deletes the unapproved hospital admins. Requires JWT of Super Admins

Request Body: 
1. email: string containing email of hospital admin to be deleted

Response Body: JSON Object containing following fields:
1. success: Boolean representing whether request was successful
2. message: String showing message. Contains message regarding success or failure

#### Sample Request
URL: /approve/hospital-admins

Request Body: 
    
    { "email": "test1@test.com"}

Response Body:
    
    {
        "success": true,
        "message": "test1@test.com is deleted"
    }
    
<hr />

#### GET /approve/super-admins
Get list of super admins to be approved. Requires JWT of Super Admins

Request Params: None

Response Body: JSON Object containing following fields:
1. success: Boolean representing whether request was successful
2. message: String present if success is false. Contains message regarding failure
3. unapproved: Array contains JSON object of unapproved doctors. Each item of array contains
    1. email: String showing email of unapproved super admin
#### Sample Request
URL: /approve/super-admins

Response Body:

    {
        "success": true,
        "unapproved": [
            { "email": test1@test.com"},
            { "email": test2@test.com"},
        ]
    }

#### POST /approve/super-admins
Approve the super admin. Requires JWT of Super Admin

Request Body: 
1. email: string containing email of super admin to be approved

Response Body: JSON Object containing following fields:
1. success: Boolean representing whether request was successful
2. message: String showing message. Contains message regarding success or failure

#### Sample Request
URL: /approve/super-admins

Request Body: 
    
    { "email": "test1@test.com"}

Response Body:
    
    {
        "success": true,
        "message": "test1@test.com is approved"
    }
    
#### DELETE /approve/super-admins
Delete the unapproved super admin. Requires JWT of Super Admins

Request Body: 
1. email: string containing email of super admin to be deleted

Response Body: JSON Object containing following fields:
1. success: Boolean representing whether request was successful
2. message: String showing message. Contains message regarding success or failure

#### Sample Request
URL: /approve/super-admins

Request Body: 
    
    { "email": "test1@test.com"}

Response Body:
    
    {
        "success": true,
        "message": "test1@test.com is deleted"
    }
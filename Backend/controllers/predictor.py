from flask_restful import Resource, reqparse
import pickle
import json
class Symptoms(Resource):
    def get(self):
        return {
            'success': True,
            'symptoms': [
                'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine',
                'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach',
                'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation',
                'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs',
                'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool',
                'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs',
                'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails',
                'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips',
                'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints',
                'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness',
                'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine',
                'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
                'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain',
                'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite',
                'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration',
                'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma',
                'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload',
                'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples',
                'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails',
                'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze'
            ]
        }


class Disease(Resource):
    def get(self):
        return {
            'success': True,
            'diseases': [
                'Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction',
                'Peptic ulcer disease', 'AIDS', 'Diabetes', 'Gastroenteritis', 'Bronchial Asthma', 'Hypertension',
                ' Migraine', 'Cervical spondylosis', 'Paralysis (brain hemorrhage)', 'Jaundice', 'Malaria',
                'Chicken pox',
                'Dengue', 'Typhoid', 'hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E',
                'Alcoholic hepatitis', 'Tuberculosis', 'Common Cold', 'Pneumonia', 'Dimorphic hemorrhoids(piles)',
                'Heart Attack', 'Varicose Veins', 'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia', 'Osteoarthritis',
                'Arthritis', '(vertigo) Paroxysmal  Positional Vertigo', 'Acne', 'Urinary tract infection', 'Psoriasis',
                'Impetigo'
            ]
        }


class Predictor(Resource):
    def __init__(self):
        file = open('./controllers/decisiontree.pickle', 'rb')
        self.classifier = pickle.load(file)
        file.close()
        self.labels = [
            'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine',
            'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach',
            'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation',
            'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs',
            'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool',
            'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs',
            'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails',
            'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips',
            'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints',
            'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness',
            'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine',
            'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
            'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain',
            'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite',
            'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration',
            'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma',
            'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload',
            'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples',
            'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails',
            'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze'
        ]
        self.disease = [
            'Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction',
            'Peptic ulcer disease', 'AIDS', 'Diabetes', 'Gastroenteritis', 'Bronchial Asthma', 'Hypertension',
            ' Migraine', 'Cervical spondylosis', 'Paralysis (brain hemorrhage)', 'Jaundice', 'Malaria', 'Chicken pox',
            'Dengue', 'Typhoid', 'hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E',
            'Alcoholic hepatitis', 'Tuberculosis', 'Common Cold', 'Pneumonia', 'Dimorphic hemorrhoids(piles)',
            'Heart Attack', 'Varicose Veins', 'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia', 'Osteoarthritis',
            'Arthritis', '(vertigo) Paroxysmal  Positional Vertigo', 'Acne', 'Urinary tract infection', 'Psoriasis',
            'Impetigo'
        ]
        json_file = open('./controllers/diseaseData.json', 'r')
        self.disease_data = json.loads(json_file.read())
        json_file.close()


    def get(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("symptoms", type=str)
            params = parser.parse_args()
            if not params.symptoms:
                return {
                    "success": False,
                    "message": "Symptoms Missing"
                }
            symptoms = params.symptoms.split(",")
            if len(params) == 0:
                return {
                    "success": False,
                    "message": "Symptoms Missing"
                }
            l2 = [0 for i in range(len(self.labels))]
            for k in range(0, len(self.labels)):
                for z in symptoms:
                    if z.strip() == self.labels[k]:
                        l2[k] = 1
            print(l2.count(1))
            predict = self.classifier.predict([l2])
            predicted = self.disease[predict[0]]
            response = {
                "success": True,
                "disease": predicted
            }
            disease_data = self.disease_data[predicted]
            for key in disease_data:
                response[key] = disease_data[key]
            response['img'] = 'https://realtimehospital.vercel.app/assets/' + disease_data['img']
            response['webp'] = response['img'].replace('.jpg', '.webp').replace('.png', '.webp')
            return response
        except Exception as e:
            print(e)
            return {
                "success": False,
                "message": "Something went wrong"
            }

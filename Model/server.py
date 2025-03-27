from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from scipy.stats import mode

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # ✅ Allow all origins

# Load models and label encoder
random_forest_model = joblib.load('random_forest_model.pkl')
naive_bayes_model = joblib.load('naive_bayes_model.pkl')
decision_tree_model = joblib.load('decision_tree_model.pkl')
le = joblib.load('label_encoder.pkl')

# Load all symptoms
all_symptoms = joblib.load('all_symptoms_list2.pkl')

def predict_disease(chosen_symptoms):
    input_vector = [1 if symptom in chosen_symptoms else 0 for symptom in all_symptoms]
    print(input_vector)
    rf_pred = random_forest_model.predict([input_vector])
    nb_pred = naive_bayes_model.predict([input_vector])
    dt_pred = decision_tree_model.predict([input_vector])
    
    predictions = np.array([rf_pred, nb_pred, dt_pred])
    majority_vote = mode(predictions, axis=0)[0].flatten()
    
    final_disease = le.inverse_transform(majority_vote)
    return final_disease[0]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms = data.get('symptoms', [])

    if not symptoms:
        return jsonify({'error': 'No symptoms provided'}), 400

    predicted_disease = predict_disease(symptoms)
    
    # ✅ Explicitly allow CORS in response headers
    response = jsonify({'predicted_disease': predicted_disease})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)

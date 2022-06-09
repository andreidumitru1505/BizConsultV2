import pandas as pd
import pickle
import sys

data = [[sys.argv[1], sys.argv[2], sys.argv[3]]]

df = pd.DataFrame(data, columns=['Studies', 'Age', 'Gender'])
 
loaded_model = pickle.load(open('../algoML/classificationModel.sav', 'rb'))
prediction = loaded_model.predict(df)
print(prediction[0])
sys.stdout.flush()
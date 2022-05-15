# Disease Predictor Model -

## Description of the dataset -

Dataset for this project was collected from a study of university of Columbia performed at New
York Presbyterian Hospital

### training.csv - 

* This is the main dataset which has been used in this project. This dataset consist of mainly two columns "Disease" and "Symptoms". This dataset is used to train our model.

### testing.csv -

* This is the dataset which has been used to test our model so that we can know the accuracy of our model. this dataset is predefined with output.
  
## Libraries used - 

### Numpy: 

* Numpy is core library of scientific computing in python. It provides powerful tools to
deal with various multi-dimensional arrays in python. It is a general purpose array processing
package.
* Numpy’s main purpose is to deal with multidimensional homogeneous array. It has tools ranging
from array creation to its handling. It makes it easier to create a n dimensional array just by using
np.zeros() or handle its contents using various other methods such as replace, arrange, random,
save, load it also helps I array processing using methods like sum, mean, std, max, min, all, etc.

### Pandas : 
* It is the most popular python library used for data analysis. It provides highly
optimized performance with back-end source code purely written in C or python.
* Data in python can be analysed with 2 ways -
  1. Series - Series is one dimensional array defined in pandas used to store any data type.
  2. Dataframes - Dataframes are two-dimensional data structure used in python to store data consisting of rows
and columns.
  
* Pandas dataframe is used extensively in this project to use datasets required for training and
testing the algorithms. Dataframes makes it easier to work with attributes and results. Several ofits inbuilt functions such as replace were used in our project for data manipulation and
preprocessing.


### Sklearn: 
* Sklearn is an open source python library with implements a huge range of machine-
learning, pre-processing, cross-validation and visualization algorithms. It features various simple
and efficient tools for data mining and data processing. It features various classification,
regression and clustering algorithm such as support vector machine, random forest classifier,
decision tree, gaussian naïve-Bayes, KNN to name a few.
* In this project we have used sklearn to get advantage of inbuilt classification algorithm like decision trees. We have also used inbuilt cross
validation and visualization features such as classification report, confusion matrix and accuracy
score.

## Model used - 

We have used the Decision tree model to predict the disease.
* Decision tree is classified as a very effective and versatile classification technique. It is used in
pattern recognition and classification for image. It is used for classification in very complex
problems dew to its high adaptability. It is also capable of engaging problems of higher
dimensionality. 
* It mainly consists of three parts root, nodes and leaf.
Roots consists of attribute which has most effect on the outcome, leaf tests for value of certain
attribute and leaf gives out the output of tree.
* Decision tree is the first prediction method we have used in our project. It gives us an accuracy
of ~95%.
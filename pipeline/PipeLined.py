import re, io, json, numpy as np
import os
import sys
import nltk
import logging
from nltk import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer, SnowballStemmer
from keras.preprocessing.text import tokenizer_from_json
from keras.utils import pad_sequences
from keras.models import load_model

# Configure logging
logging.basicConfig(level=logging.DEBUG)
comment_text = sys.argv[1]

print('Comment text as received in pipeline:', comment_text)

# Determine the directory of the current script
script_dir = os.path.dirname(__file__)

# Construct the path to the model file
model_path = os.path.join(script_dir, 'hate_model.h5')
spam_model_path = os.path.join(script_dir, 'spam_model.h5')
tokenizer_hate_path = os.path.join(script_dir, 'tokenizer_hate.json')
tokenizer_spam_path = os.path.join(script_dir, 'tokenizer_spam.json')

# Load models and tokenizers outside the function to avoid reloading them on each call
hate_model = load_model(model_path)
spam_model = load_model(spam_model_path)

# Load the tokenizers
with open(tokenizer_hate_path) as f:
    tokenizer_hate = tokenizer_from_json(json.load(f))

with open(tokenizer_spam_path) as f:
    tokenizer_spam = tokenizer_from_json(json.load(f))
    

stopwords_set = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()
stemmer = SnowballStemmer("english")

def processed(text) -> list:
    cont_patterns = [
        ('(W|w)on\'t', 'will not'),
        ('(C|c)an\'t', 'can not'),
        ('(I|i)\'m', 'i am'),
        ('(A|a)in\'t', 'is not'),
        ('(\w+)\'ll', '\g<1> will'),
        ('(\w+)n\'t', '\g<1> not'),
        ('(\w+)\'ve', '\g<1> have'),
        ('(\w+)\'s', '\g<1> is'),
        ('(\w+)\'re', '\g<1> are'),
        ('(\w+)\'d', '\g<1> would'),
    ]
    patterns = [(re.compile(regex), repl) for regex, repl in cont_patterns]
    text = text.lower()
    for pattern, repl in patterns: text = re.sub(pattern, repl, text)
    text = re.sub(r"http\S+", "", text)
    text = re.sub('[^a-zA-Z]', ' ', text)
    text = ' '.join(text.split())
    text = [word for word in word_tokenize(text) if word not in stopwords_set]
    text = [lemmatizer.lemmatize(word) for word in text]
    text = [stemmer.stem(word) for word in text]
    return [text]

def get_ratings(text):
    vec = processed(text)
    vec_hate = np.array(tokenizer_hate.texts_to_sequences(vec))
    vec_spam = np.array(tokenizer_spam.texts_to_sequences(vec))
    vec_hate = pad_sequences(vec_hate, maxlen=2000)
    vec_spam = pad_sequences(vec_spam, maxlen=2000)
    hate_rating = 100 * hate_model.predict(vec_hate)[0,0]
    spam_rating = 100 * spam_model.predict(vec_spam)[0,0]
    return hate_rating, spam_rating

send_ratings = get_ratings(comment_text);
print(send_ratings)

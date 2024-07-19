from diffusers import StableDiffusionXLPipeline
import torch
import streamlit as st
import os
from PIL import Image
import numpy as np
import pickle
import tensorflow
import pandas as pd
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.neighbors import NearestNeighbors
from numpy.linalg import norm        

# Load precomputed features and filenames
feature_list = np.array(pickle.load(open('embedding_large.pkl', 'rb')))
filenames = pd.read_pickle('filenames_large.pkl')

feature_list_myntra = np.array(pickle.load(open('embedding_myntra.pkl', 'rb')))
filenames_myntra = pd.read_pickle('filenames_myntra.pkl')

# Load and configure the model
model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
model.trainable = False

model = tensorflow.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])

st.title('Fashion Recommender System')

def save_uploaded_file(uploaded_file):
    try:
        with open(os.path.join('uploads', uploaded_file.name), 'wb') as f:
            f.write(uploaded_file.getbuffer())
        return 1
    except:
        return 0

def feature_extraction(img_path, model):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)
    return normalized_result

def recommend(features, feature_list):
    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list)
    distances, indices = neighbors.kneighbors([features])
    return indices

def recommend_myntra(features, feature_list):
    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list_myntra)
    distances, indices = neighbors.kneighbors([features])
    return indices

# Load the Stable Diffusion XL pipeline
pipe = StableDiffusionXLPipeline.from_pretrained(
    "segmind/SSD-1B",
    torch_dtype=torch.float16,
    use_safetensors=True,
    variant='fp16',
)
pipe.to('cuda')

def generate_image():
    prompt = "Generate a single outfit based on the latest fashion trends, similar to fashion model."
    neg_prompt = "ugly, blurry, poor quality"
    image = pipe(prompt=prompt, negative_prompt=neg_prompt).images[0]
    return image

menu = ['FRM', 'Mynterest']
option = st.sidebar.selectbox("Select your model", menu)

if option == 'FRM':
    uploaded_file = st.file_uploader("Choose an image")
    if uploaded_file is not None:
        if save_uploaded_file(uploaded_file):
            display_image = Image.open(uploaded_file)
            st.image(display_image)
            features = feature_extraction(os.path.join("uploads", uploaded_file.name), model)
            indices = recommend_myntra(features, feature_list)
            st.header("Recommend For You....")
            st.text("")
            col1, col2, col3, col4, col5 = st.columns(5)
            with col1:
                st.image(filenames_myntra[indices[0][1]])
            with col2:
                st.image(filenames_myntra[indices[0][2]])
            with col3:
                st.image(filenames_myntra[indices[0][3]])
            with col4:
                st.image(filenames_myntra[indices[0][4]])
            with col5:
                st.image(filenames_myntra[indices[0][5]])
        else:
            st.header("Some error occured in file upload")

if option == 'Mynterest':
    with st.spinner('Generating image...'):
        generated_image = generate_image()
        st.image(generated_image, caption='AI-Generated Image', use_column_width=True)
        generated_image_path = os.path.join('uploads', 'generated_image.png')
        generated_image.save(generated_image_path)
        features = feature_extraction(generated_image_path, model)
        indices = recommend_myntra(features, feature_list_myntra)
        st.header("Recommended For You...")
        st.text("")
        col1, col2, col3, col4, col5 = st.columns(5)
        with col1:
            st.image(filenames_myntra[indices[0][1]])
        with col2:
            st.image(filenames_myntra[indices[0][2]])
        with col3:
            st.image(filenames_myntra[indices[0][3]])
        with col4:
            st.image(filenames_myntra[indices[0][4]])
        with col5:
            st.image(filenames_myntra[indices[0][5]])

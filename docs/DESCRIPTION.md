# PestDetect - Additional Details

## Backend
The backend of our project uses the Nginx software to host the webchat Watson Assistant and a Flask web app that process the images. The applications are then packaged using Docker which is based on the client-server architecture, and the development is streamlined by standardizing the environments using local containers. 
They are then packaged into images(virtual environments) which are run by pods in the IBM kubernetes service. The Backend services are then exposed to the web using the free NodePort Service provided by IBM.

## PestDetect Model Architecture
The model achieves a testing accuracy of ~90% despite the relatively small dataset (~7000 images) by using l2 regularisation, early stopping, dropout, data augmentation and fine tuning.

_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 input_3 (InputLayer)        [(None, 256, 256, 3)]     0         
                                                                 
 sequential_1 (Sequential)   (None, 256, 256, 3)       0         
                                                                 
 MobilenetV3large (Functiona  (None, 8, 8, 960)        2996352   
 l)                                                              
                                                                 
 global_average_pooling2d_1   (None, 960)              0         
 (GlobalAveragePooling2D)                                        
                                                                 
 dropout_2 (Dropout)         (None, 960)               0         
                                                                 
 sequential_2 (Sequential)   (None, 32)                63584     
                                                                 
 dense_1 (Dense)             (None, 7)                 231       
                                                                 
=================================================================
Total params: 3,060,167
Trainable params: 2,926,167
Non-trainable params: 134,000
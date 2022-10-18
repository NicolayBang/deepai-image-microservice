# deepai-image-microservice
Plug-in for https://github.com/jtekt/image-storage-microservice that uses the DeepAI API. Built with Node.js, deployed using Docker.  

Coming soon:

-More detailed API instructions and setup guide

-Dockerfile and docker-compose file for complete deployment from any host machine to simplify deployement (Docker required)

Info:

-This microservice adds a AI image generating feature to image-storage-microservice made by https://github.com/maximemoreillon. To access the generated images on the local computer, go to http://localhost:31221. Access the api at http://localhost:31222. For more instructions go to
https://github.com/jtekt/image-storage-microservice.

-This plugin is lightweight, it only does three tasks; receive a string input, turn it into and image and store it into image-storage-microservice.<br><br>
-The plan is to use this to generate images for my recipes for the recipe book web service at http://titepoule.com, but it can have other uses. I have generated
many pictures as part of testing the service with different prompts. All these images offer some insights into the way the DeepAI model works. Therefore, it has potential data science applications. Another microservice could be made with a relational database made specifically for this purpose with additionnal data and information. If this is of interest to you, or if you want access to the data I have generated testing, please email me at nicolaybang@gmail.com<br>  
-The dev of the image-storage-microservice uses mongoDB to store the metadata of the image, but the images are stored on a file system allowing
for a more optimal handling of large files like images than with a regular relational database. 

<br>
Algorithm:
<br>
<br>1)listens on port 8181 for a request
<br>2)receives a string input
<br>3)pass the string input to DeepAi API
<br>4)receive a image URL
<br>5)fetch the .jpg file from the link returned by DeepAI API, 
<br>6)save the file in a temp folder called images, 
<br>7)send that image to the image-storage-microservice,
<br>8)image is deleted on that container, 
<br>9)return a unique id. 

<br>This id can be used for integration in a existing relational database like MariaDB or MySQL as I plan to do. 

Instructions: 

-go on any browser or Postman and type http://localhost:8181/YOUR_INPUT_HERE 

-go to http://localhost:31222 to view the generated image.*

-the image will have the name of the prompt.

-As of now duplicates are not possible as for my use case I want recipe names to be unique. Support for duplicates can be added with a few lines of code on the 
deepai-image-microservice by appending an incrementing index to the name.

-to integrate this service with an existing client, use http://localhost:31221 and follow the instructions at https://github.com/jtekt/image-storage-microservice for image retrival.<br>  
Credits:

- image-storage-microservice: built by https://github.com/maximemoreillon. I am grateful for his open source project as it has offered me a greater understandng of the microservice architecture and docker deployement.<br>
 
*Keep in mind that because of the nature of AI image generation and asynchronous programming, this takes a few seconds. Depending on your internet connection and the state of the DeepAI API this can take anywhere between 10 to 30 seconds. The response 200.ok means that the image was generated and added to the storage.
Also this plugin has not been optimized or tested for heavy reapeated use as of yet, this is on my TODO list. 





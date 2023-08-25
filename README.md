# Cook Manager
This application includes modules that help restaurants manage different parts of their business

# Project details
- ### **Architecture**:
    #### Model-View-Controller (MVC)
    This architectural pattern divides the application structure into 3 main parts, known as layers, allowing a clear separation of tasks and improving maintenance and scalability:
    - #### **Model**
        Responsible for data manipulation and database communication. Apply business rules to data models.
    - #### **Controller**
        Responsible for Model-View communication. It receives requests from View, send them to Model and return the response to View, which updates the interface.
    - #### **View**
        Responsible for managing and updating user interface based on interactions and data changes
- ### **Database and Data Storage**
    - #### **Django ORM**
        The database is managed through Django's admin interface, which provides an user-friendly way of managing data.
    - #### **Google Cloud Storage**
        File storage to keep image, pdf and other files
- ### **Backend**
    - #### **Python**
        Code for Model and Controller layers
- ### **Frontend**
    - #### **TypeScript**
        Code for View layer
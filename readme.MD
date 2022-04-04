How to start the application:
I am using linux commands, use appropriate to your OS

1. clone the repository into a new folder:
> git clone https://github.com/grizzlydevil/metamask-homework.git

rest_metamask folder is for backend
and frontend folder for react files

2. create a virtual environment
> python3 -m venv env --upgrade-deps

3. activate evironment
> source env/bin/activate

4. install dependencies
> pip install -r requirements.txt

5. go to rest_metamask folder migrate and runserver
> cd rest_metamask

> python manage.py migrate

> python manage.py runserver

6. go to frontend folder and start react
> cd ../frontend

> npm start

7. go to http://localhost:3000/ in your browser with metamask extension.

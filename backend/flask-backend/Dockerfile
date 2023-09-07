# Use an official Python runtime as a parent image
FROM python:3.11.4-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

RUN apt-get update && apt-get install -y libgl1-mesa-glx libglib2.0-0

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

RUN pip install gunicorn

# Copy the current directory contents into the container at /app
COPY . /app/

# Make port 80 available to the world outside this container
EXPOSE 5000

# Define environment variable for Flask app
ENV FLASK_APP=app.py

# Run the command to start your Flask app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "--access-logfile", "/app/access.log", "app:app"]
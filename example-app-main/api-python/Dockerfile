FROM python:3.9
COPY . /api
WORKDIR /api
RUN pip install -r requirements.txt
ENTRYPOINT flask run --host=0.0.0.0 --port=5000
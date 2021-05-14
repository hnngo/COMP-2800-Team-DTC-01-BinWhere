FROM python:3.9

EXPOSE 5000

WORKDIR /app

COPY * /app/

RUN pip3 install flask
RUN pip3 install firebase_admin

CMD cd /app && python app.py
#CMD ["flask", "run", "--host", "0.0.0.0"]

FROM python:3

EXPOSE 5000

WORKDIR /app

COPY * /app/

RUN pip3 install flask
RUN pip3 install firebase_admin

CMD python app.py
#CMD ["flask", "run", "--host", "0.0.0.0"]

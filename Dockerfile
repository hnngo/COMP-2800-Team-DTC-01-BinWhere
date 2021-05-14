FROM python:3.9

EXPOSE 5000

WORKDIR ./

COPY * ./

RUN pip3 install flask
RUN pip3 install firebase_admin

CMD python app.py
#CMD ["flask", "run", "--host", "0.0.0.0"]

from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=200)
    enum = models.CharField(max_length=6, primary_key = True)
    fnum = models.CharField(max_length=10)
    pwd = models.CharField(max_length=200)

class Teacher(models.Model):
    name = models.CharField(max_length=200)
    empid = models.CharField(max_length=6, primary_key = True)
    pwd = models.CharField(max_length=200)

class Logfile(models.Model):
    loginId = models.CharField(max_length=6)
    date_time = models.DateTimeField(auto_now=True)

class Course(models.Model):
    courseCode = models.CharField(max_length=7, primary_key = True)
    courseTitle = models.CharField(max_length=200)
    empid = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    courseTutor = models.CharField(null=True,blank=True,max_length=200)

class CourseRegistered(models.Model):
    enum = models.ForeignKey(Student, on_delete=models.CASCADE)
    courseId1 = models.CharField(max_length=7)
    courseId2 = models.CharField(max_length=7)
    courseId3 = models.CharField(max_length=7)
    courseId4 = models.CharField(max_length=7)
    courseId5 = models.CharField(max_length=7)
    courseId6 = models.CharField(max_length=7, null=True)
    courseId7 = models.CharField(max_length=7, null=True)

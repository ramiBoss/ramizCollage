from django.http import Http404
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .forms import Student_Reg, Teacher_Reg, Student_Login, CourseRegistration
from django import forms
from .models import Student, Teacher, CourseRegistered, Course

# Home of either student or employee

# Student's Home Page
def student_home(request):
    if request.session["enum"]:
        enum = request.session["enum"]
        std = Student.objects.get(enum = enum)
        crs_data = CourseRegistered.objects.get(enum = enum)
        return render(request, 'clgmng/std_home.html', {'std' : std, 'data' : crs_data, 'enum' : enum })
    else:
        return redirect('../std_login')


# Course Registration form
def course_register(request):
    if request.session["enum"]:
        if request.method == 'POST':
            form = CourseRegistration(request.POST)
            if form.is_valid():
                courseId1 = form.cleaned_data['courseId1']
                courseId2 = form.cleaned_data['courseId2']
                courseId3 = form.cleaned_data['courseId3']
                courseId4 = form.cleaned_data['courseId4']
                courseId5 = form.cleaned_data['courseId5']
                courseId6 = form.cleaned_data['courseId6']
                courseId7 = form.cleaned_data['courseId7']
                crs_reg = CourseRegistered(enum = enum, courseId1 = courseId1, courseId2 = courseId2, courseId3 = courseId3, courseId4 = courseId4, courseId5 = courseId5, courseId6 = courseId6, courseId7 = courseId7)
                if crs_reg.save():
                    request.session["enum"] = enum
                    return redirect('../std_home')
            else:
                msg = "Form Validation Error Occurred"
                return render(reuest, 'clgmng/course_reg.html', {'form' : form })
        else:
            form = CourseRegistration()
    else:
        return HttpResponseNotFound('<h1>Page not found</h1>')
    return render(request, 'clgmng/course_reg.html', {'form' : form})

# Teacher's Home Page
def teacher_home(request):
    if request.session["empid"]:
        empid = request.session["empid"]
        tec = Teacher.objects.get(empid = empid)
        tec_data = Course.objects.filter(empid = empid)
        return render(request, 'clgmng/tec_home.html',{'tec' : tec, 'data' : tec_data, 'empid' : empid} )
    else:
        return redirect('../tec_login')

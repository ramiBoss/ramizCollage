from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .forms import Student_Reg, Teacher_Reg, Student_Login, Teacher_Login
from django import forms
from .models import Student, Teacher

# Index Page
def index(request):
    for key in request.session.keys():
        del request.session[key]
    return render(request, 'clgmng/index.html')

# Student Registration
def Reg_Student(request):
    if request.method == 'POST':
        form = Student_Reg(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            enum = form.cleaned_data['enum']
            fnum = form.cleaned_data['fnum']
            pwd = form.cleaned_data['pwd']
            r_pwd = form.cleaned_data['r_pwd']
            if pwd == r_pwd:
                if form.is_already_registered() == False:
                    std = Student(name =name, enum = enum, fnum = fnum, pwd = pwd)
                    std.save()
                    return redirect('../std_login')
                else:
                    msg = "Enrollment Number is Already Registered"
                    form.add_error('enum', msg)
                    return render(request, 'clgmng/std_reg.html', {'form' : form })
            else:
                msg = "Passwords didn't match"
                form.add_error('r_pwd', msg)
                return render(request, 'clgmng/std_reg.html', {'form' : form })
        else:
            msg = "Form Not Valid, Validation Error Occurred"
            form.add_error('name', msg)
            return render(request, 'clgmng/std_reg.html', {'form' : form })
    else:
        form = Student_Reg()
    return render(request, 'clgmng/std_reg.html', {'form' : form })

# Teacher Registration
def Reg_Teacher(request):
    if request.method == 'POST':
        form = Teacher_Reg(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            empid = form.cleaned_data['empid']
            pwd = form.cleaned_data['pwd']
            r_pwd = form.cleaned_data['r_pwd']
            if r_pwd == pwd:
                if form.is_already_registered == False:
                    tec = Teacher(name = name, empid = empid, pwd = pwd)
                    tec.save()
                    return redirect('../tec_login')
                else:
                    msg = "Employee Id Already Registered"
                    form.add_error('empid', msg)
                    return render(request, 'clgmng/tec_reg.html', {'form' : form })
            else:
                msg = "Passwords didn't match"
                form.add_error('pwd', msg)
                return render(request, 'clgmng/tec_reg.html', {'form' : form })
        else:
            msg = "Form Not Valid, Validation Error Occurred"
            form.add_error(msg)
            return render(request, 'clgmng/tec_reg.html', {'form' : form })
    else:
        form = Teacher_Reg()
    return render(request, 'clgmng/tec_reg.html', {'form' : form })

# Student Login
def Login_Student(request):
    for key in request.session.keys():
        del request.session[key]
    if request.method == 'POST':
        form = Student_Login(request.POST)
        if form.is_valid():
            enum = form.cleaned_data['enum']
            pwd = form.cleaned_data['pwd']
            std = Student.objects.get(enum = enum, pwd = pwd)
            if std:
                request.session["enum"] = enum
                return redirect('../std_home')
            else:
                msg = "Incorrect Enrollment Number/Password"
                form.add_error('enum', msg)
                return render(request, 'clgmng/std_login.html', {'form' : form })
        else:
            msg = "Form Not Valid, Validation Error Occurred"
            form.add_error(msg)
            return render(request, 'clgmng/std_login.html', {'form' : form })
    else:
        form = Student_Login()
    return render(request, 'clgmng/std_login.html', {'form' : form})

# Teacher Login
def Login_Teacher(request):
    for key in request.session.keys():
        del request.session[key]
    if request.method == 'POST':
        form = Teacher_Login(request.POST)
        if form.is_valid():
            empid = form.cleaned_data['empid']
            pwd = form.cleaned_data['pwd']
            tec = Teacher.objects.filter(empid = empid, pwd = pwd)
            if tec:
                request.session["empid"] = empid
                return redirect('../tec_home')
            else:
                msg = "Incorrect Employee Id/Password"
                form.add_error('empid', msg)
                return render(request, 'clgmng/tec_login.html', {'form' : form })
        else:
            msg = "Form Not Valid, Validation Error Occurred"
            form.add_error(msg)
            return render(request, 'clgmng/tec_login.html', {'form' : form })
    else:
        form = Teacher_Login()
    return render(request, 'clgmng/tec_login.html', {'form' : form})

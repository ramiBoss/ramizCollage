from django import forms
from .models import Student, Teacher, Course

class Student_Reg(forms.Form):
    name = forms.CharField(max_length=200)
    enum = forms.CharField(max_length=6)
    fnum = forms.CharField(max_length=10)
    pwd = forms.CharField(max_length=200, widget = forms.PasswordInput())
    r_pwd = forms.CharField(max_length=200, widget = forms.PasswordInput())

    def __init__(self, *args, **kwargs):
        super(Student_Reg, self).__init__(*args, **kwargs)
        self.fields['name'].label = "Your Name"
        self.fields['enum'].label = "Enrollment Number"
        self.fields['fnum'].label = "Faculty Number"
        self.fields['pwd'].label = "Password"
        self.fields['r_pwd'].label = "Retype Password"

    def is_already_registered(self):
        data = super(Student_Reg, self).clean()
        result = Student.objects.get(enum = data.get('enum'))
        if result:
            print(result)
            return True
        else:
            return False


class Teacher_Reg(forms.Form):
    name = forms.CharField(max_length=200)
    empid = forms.CharField(max_length=6)
    pwd = forms.CharField(max_length=200, widget = forms.PasswordInput())
    r_pwd = forms.CharField(max_length=200, widget = forms.PasswordInput())

    def __init__(self, *args, **kwargs):
        super(Teacher_Reg, self).__init__(*args, **kwargs)
        self.fields['name'].label = "Your Name"
        self.fields['empid'].label = "Employee Id"
        self.fields['pwd'].label = "Password"
        self.fields['r_pwd'].label = "Retype Password"


    def is_already_registered(self):
        data = super(Teacher_Reg, self).clean()
        result = Teacher.objects.get(empid = data.get('empid'))
        if result:
            return True
        else:
            return False

class Student_Login(forms.Form):
    enum = forms.CharField(max_length=6)
    pwd = forms.CharField(max_length=200, widget = forms.PasswordInput())

    def __init__(self, *args, **kwargs):
        super(Student_Login, self).__init__(*args, **kwargs)
        self.fields['enum'].label = "Enrollment Number"
        self.fields['pwd'].label = "Password"

class Teacher_Login(forms.Form):
    empid = forms.CharField(max_length=6)
    pwd = forms.CharField(max_length=200, widget = forms.PasswordInput())

    def __init__(self, *args, **kwargs):
        super(Teacher_Login, self).__init__(*args, **kwargs)
        self.fields['empid'].label = "Employee Id"
        self.fields['pwd'].label = "Password"

class CourseRegistration(forms.Form):
    courseId1 = forms.ModelChoiceField(queryset = Course.objects.all())
    courseId2 = forms.ModelChoiceField(queryset = Course.objects.all())
    courseId3 = forms.ModelChoiceField(queryset = Course.objects.all())
    courseId4 = forms.ModelChoiceField(queryset = Course.objects.all())
    courseId5 = forms.ModelChoiceField(queryset = Course.objects.all())
    courseId6 = forms.ModelChoiceField(queryset = Course.objects.all())
    courseId7 = forms.ModelChoiceField(queryset = Course.objects.all())

    def __init__(self, *args, **kwargs):
        super(CourseRegistration, self).__init__(*args, **kwargs)
        self.fields['courseId1'].label = "Course 1"
        self.fields['courseId2'].label = "Course 2"
        self.fields['courseId3'].label = "Course 3"
        self.fields['courseId4'].label = "Course 4"
        self.fields['courseId5'].label = "Course 5"
        self.fields['courseId6'].label = "Course 6"
        self.fields['courseId6'].label = "Course 7"

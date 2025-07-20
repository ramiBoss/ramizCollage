// strings and c-strings
#include <iostream>
#include <cstring>
#include <string>

using namespace std;

int main ()
{
    string str;
    cout<<"Enter string to split into tokens\n";
    getline(cin,str);
    char * cstr = new char [str.length()+1];
    strcpy (cstr, str.c_str());
    // cstr now contains a c-string copy of str
    char * p = strtok (cstr," ");
    while (p!=0)
    {
        cout << p << '\n';
        p = strtok(NULL," ");
    }
    delete[] cstr;
    return 0;
}

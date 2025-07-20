#include <iostream>
#include <string>
#include <cstddef>

using namespace std;

int main ()
{
  string str ("Please, replace the vowels in this sentence by asterisks.");
  size_t found = str.find_first_of("aeiou");
  while (found != npos)
  {
    str[found]='*';
    found=str.find_first_of("aeiou",found+1);
  }
    cout << str << '\n';
    return 0;
}

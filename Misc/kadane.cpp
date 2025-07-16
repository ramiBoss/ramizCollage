#include<iostream>
#include<algorithm>
using namespace std;

int kadane(int *arr,int n){
  int p=0,sum=0;
  cout<<n;
  for(int i=0;i<n;i++){
    sum=max(arr[i],sum+arr[i]);
    p=max(p,sum);
  }
  return p;
}

int main(){
  int arr[]={-1,2,4,-3,5,2,-5,2};
  int n=sizeof(arr)/sizeof(int);
  cout<<"Max sum subarray= "<<kadane(arr,n);
  return 0;
}

#include<iostream>
#include<stdlib.h>
#include <string>
#include <time.h>

using namespace std;

int crc(){
	int i,front,end;
	char *zero;
	char *rem;
	char *gen_f;
	string gen,inp,quo,inp_copy;
	cout<<"Enter Generater Function\n";
	cin>>gen;
	cout<<"Input please\n";
	cin>>inp;
	inp_copy.assign(inp);
	zero=(char*)malloc(sizeof(char)*gen.size());
	rem=(char*)malloc(sizeof(char)*gen.size());
	gen_f=(char*)malloc(sizeof(char)*gen.size());
	int m=gen.size();
	int n=m;

	for(unsigned i=0;i<m;i++){
	zero[i]='0';
	rem[i]=inp.at(i);
	gen_f[i]=gen.at(i);
	}

	cout<<zero<<"\n";
	cout<<rem<<"\n";
	cout<<gen_f<<"\n";

	for(int i=0;i<gen.size()-1;i++)
	inp.insert(inp.end(),'0');
	cout<<inp<<"\n";

	for(int k=m;k<=(inp.size());k++)
	{
		i=0;
		if(rem[i] == '0')
		{
			for(int j=1;j<(gen.size());j++,i++)
			{
				rem[i]=rem[j];
			}
			if(m<inp.size()){
			rem[i]=inp.at(m);
			m++;
			}
		}
		else if(rem[i] == '1')
		{
			for(int j=1;j<(gen.size());j++,i++)
			{
				if(rem[j] == gen_f[j])
				rem[i]='0';
				else
				rem[i]='1';
			}
			if(m<inp.size()){
			rem[i]=inp.at(m);
			m++;
			}
		}
		else
		{
			cout<<"wrong code\n";
			exit(0);
		}
	}

	cout<<rem<<"\n";

	if(rem[i] == 0){
	for(i=1;i<n-1;i++)
	inp_copy.push_back(rem[i]);
	std::cout<<inp_copy<<"\n";

	}
	else{
	for(i=0;i<n-1;i++)
	inp_copy.push_back(rem[i]);
	std::cout<<inp_copy<<"\n";
	}
	delete rem;
	srand (time(NULL));
	std::cout<<"Creating Noise ::->->";
	int rnum=rand()%10+1;
	std::cout<<rnum<<"\n";
	if(rnum < (inp_copy.size()-1))
	if(inp_copy.at(rnum) == '0')
	inp_copy.insert(rnum,"1");
	else
	inp_copy.insert(rnum,"0");
	std::cout<<"After Noise"<<"\n";
	std::cout<<inp_copy<<"\n";
	m=n;

	char *rem1;
	rem1=(char*)malloc(sizeof(char)*gen.size());

	for(unsigned i=0;i<m;i++){
	rem1[i]=inp_copy.at(i);
	}
/*	std::cout<<rem1<<"\n";
	std::cout<<"checking m "<<m<<"\n";*/


	for(int k=m;k<=(inp_copy.size());k++)
	{
		i=0;

		if(rem1[i] == '0')
		{
			for(int j=1;j<(gen.size());j++,i++)
			{
				if(rem1[j] == zero[j])
				rem1[i]='0';
				else
				rem1[i]='1';
			}
			if(m<inp_copy.size()){
			rem1[i]=inp_copy.at(m);
		//	std::cout<<rem1<<"\n";
			m++;}
		}
		else if(rem1[i] == '1')
		{
			for(int j=1;j<(gen.size());j++,i++)
			{
				if(rem1[j] == gen_f[j])
				rem1[i]='0';
				else
				rem1[i]='1';
			}
			if(m<inp_copy.size()){
			rem1[i]=inp_copy.at(m);
		//	std::cout<<rem1<<"\n";
			m++;}

		}
		else
		{
			std::cout<<"wrong code\n";
			exit(0);
		}
	}

	int flag=0;
	for(unsigned i=0;i<n-1;i++){
	if(rem1[i] != '0')
	{
		flag=1;
		break;
	}
	}

	if(flag == 1)
	std::cout<<"error occurred"<<"\n";
	else
	std::cout<<"ok"<<"\n";
	return 0;
}

int main(){
		char again='y';
		while(again == 'y' || again=='Y'){
			crc();
			cout<<"Try again";
			cin>>again;
		}
	return 0;
}

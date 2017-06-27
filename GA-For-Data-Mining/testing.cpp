#include <math.h>
#include <time.h>
#include <algorithm>
#include <vector>
#include <fstream>
#include <limits.h>
#include <iostream>
#include <stdlib.h>
#include <string.h>
#define ATTRIBUTES 18


using namespace std;

struct chromo{
	int gene[ATTRIBUTES];
	float fitness;
	float conf;
	bool flag[ATTRIBUTES];
};

struct chromo *chromosomes;

	bool compare(struct chromo lhs,struct chromo rhs)
	{
	return (rhs.fitness < lhs.fitness);
	}

const int tuple=20000;
const int _db=2;
int dataset[_db][tuple][ATTRIBUTES];

void read_file(){
	cout<<"in read_file()";
	FILE *finp=fopen("testing.txt","r");
	int info=0;
	int i=0;

	for(int db=0;db<_db;db++){

		while(i<tuple-1){
			for(int j=0;j<ATTRIBUTES;j++){
			fscanf(finp,"%d",&info);
			dataset[db][i][j]=info;
			info=0;
			}
			i++;
		}

		i=0;
	}
	fclose(finp);
	cout<<"read file be bye";
	return;
}

	/* ASSOCIATION RULES GENERATION	*/
	/* -----------------------------------------------------
		----------------------------------------------------
		----------------------------------------------------
		---------------------------------------------------- */

	void init_rules(string *rule){
		for(int i=0;i<ATTRIBUTES;i++)
			rule[i]=" ";
	}

	string race(int gene){
	switch(gene){
		case 0: return "Others";	break;
		case 1:	return "Caucasian";	break;
		case 2:	return "AfricanAmerican";	break;
		case 3:	return "?";	break;
	}
	}

	string gender(int gene){
	if(gene==1)
		return "Male";
	else
		return "Female";
	}

	string age(int gene){
	switch(gene){
		case 1: return "0-10";	break;
		case 2:	return "10-20";	break;
		case 3:	return "20-30";	break;
		case 4:	return "30-40";	break;
		case 5:	return "40-50";	break;
		case 6:	return "50-60";	break;
		case 7:	return "60-70";	break;
		case 8:	return "70-80";	break;
		case 9:	return "80-90";	break;
		case 10:	return "90-100";	break;
	}
	}

	string insulin(int gene){
	switch(gene){
		case 1: return "No";	break;
		case 2:	return "Up";	break;
		case 3:	return "Down";	break;
		case 4:	return "Steady";	break;
	}
	}

	string change(int gene){
	if(gene==1)
		return "No";
	else
		return "Ch";
	}


	string diabetes(int gene){
	if(gene==1)
		return "No";
	else
		return "Yes";
	}

	string readmitted(int gene){
	if(gene==1)
		return "No";
	else if(gene==3)
		return "<30";
	else
		return ">30";
	}



	int output_rules(string *rule,chromo chro){
		char buffer[10];
	for(int i=0;i<ATTRIBUTES;i++){

		if(chro.flag[i]==true){
			switch(i){
				case 0:	rule[0]=race(chro.gene[0]);	break;

				case 1:	rule[1]=gender(chro.gene[1]);	break;

				case 2:	rule[2]=age(chro.gene[2]);	break;

				case 3:	rule[3]=itoa(chro.gene[3],buffer,10);	break;	/*admission_type*/

				case 4:	rule[4]=itoa(chro.gene[4],buffer,10);	break;	/*discharge_disposition_id*/

				case 5:	rule[5]=itoa(chro.gene[5],buffer,10);	break;		/*admission_source_id*/

				case 6:	rule[6]=itoa(chro.gene[6],buffer,10);	break;	/*time_in_hospital*/

				case 7:	rule[7]=itoa(chro.gene[7],buffer,10);	break;	/*num_lab_procedures*/

				case 8:	rule[8]=itoa(chro.gene[8],buffer,10);	break;	/*num_procedures*/

				case 9:	rule[9]=itoa(chro.gene[9],buffer,10);	break;	/*num_medications*/

				case 10: rule[10]=itoa(chro.gene[10]*10,buffer,10);	break;	/*diag_1*/

				case 11: rule[11]=itoa(chro.gene[11]*10,buffer,10);	break;		/*diag_2*/

				case 12: rule[12]=itoa(chro.gene[12]*10,buffer,10);	break;	/*diag_3*/

				case 13: rule[13]=itoa(chro.gene[13],buffer,10);	break;	/*number_diagnosis*/

				case 14:	rule[14]=insulin(chro.gene[14]);	break;

				case 15:	rule[15]=change(chro.gene[15]);	break;

				case 16:	rule[16]=itoa(chro.gene[16],buffer,10);	break;	/*diabetesMed*/

				case 17:	rule[17]=readmitted(chro.gene[17]);	break;

			}
		}
	}
	return 0;
	}



	void print_assoc_rules(string *rule){
		cout<<"\n\n"<<"if ";
		for(int i=0;i<ATTRIBUTES;i++){
			if(rule[i]!=" ")
			{
				switch(i){
					case 0: cout<<"race = "<<rule[i]<<" and ";	break;
					case 1:	cout<<"gender = "<<rule[i]<<" and ";	break;
					case 2:	cout<<"age = "<<rule[i]<<" and ";	break;
					case 3:	cout<<"ad_ty_id = "<<rule[i]<<" and ";	break;
					case 4:	cout<<"disc_dis_ty_id = "<<rule[i]<<" and ";	break;
					case 5:	cout<<"adm_sour_id = "<<rule[i]<<" and ";	break;
					case 6:	cout<<"time_in_hos >= "<<rule[i]<<" and ";	break;
					case 7:	cout<<"nu_lb_hos = "<<rule[i]<<" and ";	break;
					case 8:	cout<<"nu_pro = "<<rule[i]<<" and ";	break;
					case 9:	cout<<"nu_med = "<<rule[i]<<" and ";	break;
					case 10:	cout<<"dia_1 >= "<<rule[i]<<" and ";	break;
					case 11:	cout<<"dia_2 >= "<<rule[i]<<" and ";	break;
					case 12:	cout<<"dia_3 >= "<<rule[i]<<" and ";	break;
					case 13:	cout<<"nu_dia = "<<rule[i]<<" and ";	break;
					case 14:	cout<<"ins = "<<rule[i]<<" and ";	break;
					case 15:	cout<<"ch = "<<rule[i]<<" and ";	break;
					case 16:	cout<<"dia_Med = "<<rule[i]<<" and ";	break;
				}
			}
		}
		cout<<"then re_ad = "<<rule[17];
	}

    int num_genes(struct chromo ch){
    int on_flag=0;
        for(int i=0;i<ATTRIBUTES-1;i++){
            if(ch.flag[i]==true)
                on_flag++;
        }
        return on_flag;
    }


	float test(struct chromo ch){
		//cout<<"in testing";
		int mat_consec=0;
        int num_ante=0;
        int mat_antece=0;

        num_ante=num_genes(ch);//num_genes(chromo_fit);
		//int conf=0;
		for(int db=0;db<_db;db++){
			for(int tup=0;tup<tuple;tup++){
				//int flag=0;
				if(dataset[db][tup][ATTRIBUTES-1] == ch.gene[ATTRIBUTES-1]){
                mat_consec+=1;
			for(int k=0;k<ATTRIBUTES-1;k++){
				if(ch.flag[k] == true && dataset[db][tup][k] == ch.gene[k])
                    mat_antece+=1;
                }
            }
				/*for(int i=0;i<ATTRIBUTES;i++){
					if(ch.flag[i]==true && ch.gene[i]>10 && ch.gene[i]>dataset[db][tup][i]){
						flag=1;
						break;
					}

					if(ch.flag[i]==true && ch.gene[i]<=10 && ch.gene[i]!=dataset[db][tup][i]){
						flag=1;
						break;
					}

				}*/
				//if(flag==0)
					//conf++;
			}
		}
    //cout<<ch.num<<endl;
	//cout<<((float)mat_antece/(num_ante*mat_consec))<<endl; //fitness yet to be calculated
	return ((float)mat_antece/(num_ante*mat_consec)); //fitness yet to be calculated
		//cout<<"ok testing"<<conf;
		//return conf;
	}





	int main(){
		const int gens=500;

		chromosomes=(struct chromo*)malloc(3*gens*sizeof(struct chromo));
		int i=0;
		int info=0;
		float finfo=0;
		string rule[ATTRIBUTES];
		FILE *fp=fopen("best_chromo1.txt","r");
		//cout<<"after file read";
		while(!feof(fp))
		{
			for(int j=0;j<ATTRIBUTES;j++){
				fscanf(fp,"%d",&info);
				//cout<<info;
				chromosomes[i].gene[j]=info;
				fscanf(fp,"%d",&info);
				chromosomes[i].flag[j]=info;
				info=0;
			}
			fscanf(fp,"%f",&finfo);
			//cout<<finfo;
			chromosomes[i].fitness=finfo;
			finfo=0;
			i++;
		}
		fclose(fp);
		read_file();
		//cout<<"ok out";
	//cout<<"chroosomes read complete";
	sort(chromosomes,chromosomes+gens,compare);
int j=1;
	i=1;
	while(j<10){
		if(chromosomes[i].fitness == chromosomes[i-1].fitness)
			i++;
		else{
			chromosomes[i].conf=test(chromosomes[i]);
			init_rules(rule);
			output_rules(rule,chromosomes[i]);
			print_assoc_rules(rule);
			cout<<"\nConfidence= "<<chromosomes[i].conf;
			i++;
			j++;		
		}
		if(i>(gens*3))
			break;		
	}
	
		

	//cout<<"just print rules";
//	for(int j=0;j<10;j++){
//	cout<<"\nConfidence= "<<chromosomes[j].conf;
	
	//


	return 0;
	}


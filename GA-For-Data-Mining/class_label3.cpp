#include <math.h>
#include <time.h>
#include <algorithm>
#include <vector>
#include <fstream>
#include <limits.h>
#include <iostream>
#include <stdlib.h>
#include <string.h>
#include <fstream>

#define ATTRIBUTES 18

#if defined(__linux) || defined(__linux__)
	unsigned int seed = time(NULL);
	#define RND ((double)rand_r(&seed)/RAND_MAX) // reentrant uniform rnd
#endif

#if defined(WIN32) || defined(_WIN32) || defined(__WIN32__)
	#define RND ((double)rand()/RAND_MAX) // uniform rnd
#endif

	using namespace std;
	int domain[]={3,2,10,6,10,10,10,10,6,10,10,10,10,9,4,2,2,3};

	struct chromo{
	int gene[ATTRIBUTES];
	float fitness;
	bool flag[ATTRIBUTES];
	int num;
	void mutate(const int count) {
		int mi=0;
		//cout<<"mutate"<<endl;
		for(int i=0;i<count;i++) {
			mi = (int)(round(RND*(ATTRIBUTES-2)));
			//cout<<"random mi= "<<mi;
			gene[mi] = RND*domain[mi];
			//cout<<"gene= "<<gene[mi];
		}
	}

	};

	bool compare(struct chromo lhs,struct chromo rhs)
	{
	return (rhs.fitness < lhs.fitness);
	}

	struct chromo *chromosome;
	const int tuple=16000;
	const int _db=2;
	int dataset[_db][tuple][ATTRIBUTES];

	void read_files(const int tuple){
	int info=0;
	FILE *fp=fopen("clabel3.txt","r");
	int i=0;
	int db_num=0;
	while(db_num<_db){
		cout<<"Reading db"<<db_num<<endl;
		while(i<tuple-1){
			for(int j=0;j<ATTRIBUTES;j++){
			fscanf(fp,"%d",&info);
			dataset[db_num][i][j]=info;
			info=0;
			}
			i++;
			//cout<<"Completed"<<i<<endl;
		}
		i=0;
		cout<<"Completed"<<db_num<<endl;
		db_num++;
	}
	fclose(fp);
	}

	// Chromosome Initialization function
	int init_pop(const int pop){
        const float on_off=0.60;
		chromosome=(struct chromo*)malloc(pop*sizeof(struct chromo));
		//cout<<"in pop";
	for(int i=0;i<pop;i++){
		chromosome[i].num=i;
		for(int j=0;j<ATTRIBUTES-1;j++){
			chromosome[i].gene[j]=(int)(RND*domain[j])+1;
            chromosome[i].flag[j]=true;
			/*if(coin(0.6) == 1 || j != ATTRIBUTES-1)
			chromosome[i].flag[j]=false;
			else
			chromosome[i].flag[j]=true;*/

			}
			chromosome[i].gene[ATTRIBUTES-1]=3;
			chromosome[i].flag[ATTRIBUTES-1]=true;
		}
	}
	// one point crossover
	struct chromo crossover1p(struct chromo c1,struct chromo c2,struct chromo c3,const int cp){
	//cout<<"got crossover point="<<cp<<endl;
	for(int i=0;i<ATTRIBUTES;i++){
		if(i>=cp) {
			c3.gene[i]=c2.gene[i];
		}
		else{
			c3.gene[i]=c1.gene[i];
		}
	}
	return c3;
	}


	int coin(const double crp){ // a cointoss
	if(RND<crp) return 1; // crossover
	else return 0; // mutation
	}


	 int num_genes(struct chromo ch){
    int on_flag=0;
        for(int i=0;i<ATTRIBUTES-1;i++){
            if(ch.flag[i]==true)
                on_flag++;
        }
        return on_flag;
    }


	float calc_fitness(struct chromo chromo_fit,const int tuple){
	// Calculating the fitness
	int mat_consec=0;
	int num_ante=0;
	int mat_antece=0;

	num_ante=num_genes(chromo_fit);//num_genes(chromo_fit);

	for(int db=0;db<_db;db++){
        for(int j=0;j<tuple;j++){
			if(dataset[db][j][ATTRIBUTES-1] == chromo_fit.gene[ATTRIBUTES-1]){
                mat_consec+=1;
			for(int k=0;k<ATTRIBUTES-1;k++){
				if(chromo_fit.flag[k] == true && dataset[db][j][k] == chromo_fit.gene[k])
                    mat_antece+=1;
                }
            }

            /*if(per<mat_antece/num_ante)
                per=mat_antece/num_ante;
            mat_antece=0;    */
        }
    }
    //return (float)(mat_consec*num_ante)/(mat_antece);
    cout<<chromo_fit.num<<endl;
	cout<<((float)mat_antece/(num_ante*mat_consec))<<endl; //fitness yet to be calculated
	return ((float)mat_antece/(num_ante*mat_consec)); //fitness yet to be calculated
	}

	// Probability for Roulette Wheel Selection
	float *roulette_wheel(int pop,float *sel_prob){
		float fitness_sum;
		//float sel_prob[pop];

		for(int i=0;i<pop;i++)
		fitness_sum+=chromosome[i].fitness;

		sel_prob[0]=chromosome[0].fitness/fitness_sum;

		for(int i=1;i<pop;i++)
		sel_prob[i]=sel_prob[i-1]+chromosome[i].fitness/fitness_sum;

		return sel_prob;
	}

	// Function for Parent Selection
	int selec_par(float *sel_prob,int pop){

	float rand_num=RND;
	if(rand_num <= sel_prob[0])
	return 0;

	for(int i=1;i<pop;i++)
	if(sel_prob[i] >= rand_num && rand_num > sel_prob[i-1])
	return i;

	}

	// Displaying Chromosomes
	void print_chromosomes(int pop){

		for(int i=0;i<pop;i++){
			//cout<<"pos = "<<i<<"\t\t";//<<chromosome[i].num<<"\t";

			for(int j=0;j<ATTRIBUTES;j++){

				if(chromosome[i].flag[j] == true){
				cout<<chromosome[i].gene[j]<<" ";
				}
			}
			cout<<"\t\t"<<chromosome[i].fitness;
			cout<<endl<<endl;
		}
	}



	void set_gene_on_off(int p){
		for(int i=0;i<ATTRIBUTES-1;i++)
		{
			if(round((RND*2)) == 1)
			chromosome[p].flag[i]=true;
			else
			chromosome[p].flag[i]=false;
		}
	}



	int write_best(){
	ofstream best_file;
	best_file.open("best_chromo3.txt",ios::out |ios::app);
	for(int j=0;j<3;j++){
		for(int i=0;i<ATTRIBUTES;i++){
			best_file<<chromosome[j].gene[i]<<" ";
			best_file<<chromosome[j].flag[i]<<" ";
		}
		best_file<<chromosome[j].fitness;
		best_file<<endl;
	}
		best_file.close();
		return 0;
	}

	/*
	Main routine of the diabetes_test program.
	Tasks, that are performed in this section are:

	Initialization of different variables such as,
			Number of tuple
			Population size
			Number of generations
			Number of chromosome to be discarded

	Reading the mapped file and storing the database into a 2D matrix: dataset[][]

	Looping through the generation and calculating the fitness of every chromosome and then sorting them in decreasing order of fitness function
	*/

	int main()
	{
	read_files(tuple);
	srand (time(NULL));

	const int pop = 100;								// chromosome population size
	const int gens =500; 								// maximum number of generations
	const int disc=(int)(ceil(pop*0.7)); 				// chromosomes discarded via elitism
	int par1=0,par2=0;//,parc=0;
	double crp=0.85;
	double mtp=0.04;
	double onfp=0.60;
	float *selec_prob=new float[pop];
	clock_t start=clock();


	ofstream best_file;
	best_file.open("best_chromo3.txt", ios::out | ios::trunc);
	best_file.close();

	cout<<"WELCOME TO THE TRAINING SESSION"<<endl;
	cout<<"...Initializing population..."<<endl;

	init_pop(pop);

	printf("\n---Initializing fitness function---\n");

	for(int i=0;i<pop;i++){
		chromosome[i].fitness=calc_fitness(chromosome[i],tuple);	//Initializing the fitness function
	}

	printf("\n-------Population & fitness initialized-------\n");

	for(int g=0;g<gens;g++){							 				// How many number of generations
		//cout<<"gen= "<<g<<endl;

		sort(chromosome,chromosome+pop,compare);	//Sorting the chromosomes in according to the fitness value
		write_best();				//	save best chromosome per generation

		//print_chromosomes(pop);

		selec_prob=roulette_wheel(pop,selec_prob);		//sel_prob is an array for the selection probability

		for(int p=0;p<pop;p++){

		if(p>pop-disc){													// applying elitism

			if(coin(crp)==1){											// crossover


				par1=selec_par(selec_prob,pop);							// choosing parents for crossover
				par1=selec_par(selec_prob,pop);

				chromosome[p]=crossover1p(chromosome[par1],chromosome[par2],chromosome[p],round(RND*(ATTRIBUTES-1)));
				chromosome[p].fitness=calc_fitness(chromosome[p],tuple);
				if(coin(onfp)==1)
				set_gene_on_off(p);
			}
			else{														// mutation

				chromosome[p].mutate(2);
				chromosome[p].fitness=calc_fitness(chromosome[p],tuple);
				if(coin(onfp)==1)
				set_gene_on_off(p);
			}

		}

				if(coin(mtp)==1){
				chromosome[p].mutate(1);							// Loop through the whole population
				chromosome[p].fitness=calc_fitness(chromosome[p],tuple);
				if(coin(onfp)==1)
				set_gene_on_off(p);
				}
				/*else
				chromosome[p].fitness=calc_fitness(chromosome[p],tuple);				*/
				//set_gene_on_off(p);
		}
	}

	sort(chromosome,chromosome+pop,compare);
	//print_chromosomes(pop);

	clock_t end =clock();
	double t=(double)(end-start)/CLOCKS_PER_SEC;
	printf("\nTime taken: %fs.\n",t);
	return 0;
	}

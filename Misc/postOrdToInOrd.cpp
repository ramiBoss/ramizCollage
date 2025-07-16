#include <iostream>
#include <stack>

struct node{
	char value;
	node *left,*right,*par;
};

node *root,*cur;

std::stack<char> mystck;




int pushall(char *post){
	int i=0;
	while(post[i]!='\0'){
	//std::cout<<post[i]<<" ";
	mystck.push(post[i]);	
	i++;
	}
	//std::cout<<"\n";
	return 0;
}

bool checkval(char val){
	if(val == '+' || val == '-' || val == '*' || val == '/'){
	//std::cout<<"\nreturned true";
	return true;	
	}
	else{
	//std::cout<<"\nreturned false";
	return false;	
	}
}

int inorder(struct node *ttemp){
	//std::cout<<"in inorder";

	if(ttemp == NULL)
	return 0;
		inorder(ttemp->left);
		std::cout<<" "<<ttemp->value;
		inorder(ttemp->right);
	
		
}


int convert(){
	char val;
	node *temp,*tcur;
	
	while(!mystck.empty())
	{
	
	val=mystck.top();	
	//std::cout<<val<<"\t";
	mystck.pop();
	
	temp=new node;
	temp->value=val;
	temp->left=NULL;
	temp->right=NULL;
	temp->par=NULL;
	
	if( checkval(val) == true){
	
	if(root == NULL){
	root=temp;
	tcur=root;	
	//std::cout<<"inserted"<<temp->value;
	}
		
	else{
		//tcur=cur;
		
		while(tcur != NULL){
			
		if(tcur->right==NULL){
		temp->par=tcur;	
		tcur->right=temp;	
		tcur=tcur->right;
		//std::cout<<"\tinserted"<<temp->value;
		break;
		}
			
		else if(tcur->left==NULL)
		{
		temp->par=tcur;
		tcur->left=temp;
		tcur=tcur->left;
		//std::cout<<"\tinserted"<<temp->value;
		break;
		}	
		tcur=tcur->par;				
		
		}
		
					
	}
	
	}
	else{
	
	if(tcur->right == NULL){
		tcur->right=temp;
		//std::cout<<"\tinserted"<<temp->value;
		
	}
		else{
		tcur->left=temp;
		//std::cout<<"\tinserted"<<temp->value;
	}
	}
	}
	//std::cout<<"value at root"<<root->value;
	//inorder(root);
	return 0;
}




int main(){
	char postfix[] = "ab+ef*g*-";
	root=NULL;
	cur=NULL;
	std::cout<<"calling push all...........\n";
	pushall(postfix);
	std::cout<<"calling convert................\n";
	convert();
	std::cout<<"calling inorder.....................\n";
	std::cout<<"\n*******************InOrder Traversal ****************************\n";
	inorder(root);
	return 0;
}


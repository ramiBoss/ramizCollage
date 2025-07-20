#include<stdio.h>
#include<string.h>

int main()
{
	int key,i;
	char str[25];
	/*for(i=97;i<125;i++)
	{
	printf("%d\t",i);
	printf("%c\n",i);
	}*/

	printf("Enter the message\n");
	gets(str);
	printf("Enter the key 0-25\n");
	scanf("%d",&key);

	for(i=0;i<=strlen(str);i++)
	{
		if(str[i]==' ')
		printf("%c",str[i]);

		else{
		printf("%c",(str[i]+key));
		}
	}
	return 0;
}


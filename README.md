# Run

## First run on your laptop

* ```docker-machine create qs-prod```
* ```cp docker-compose-prod.yml docker-compose.yml```
* ```eval $(docker-machine env qs-prod)```
* Use IP you got from ```docker-machine ip qs-prod``` to update /etc/hosts file (add the line on top):

```
192.168.xxx.xxx  api.qs.prod
192.168.xxx.xxx  qs.prod
192.168.xxx.xxx  www.qs.prod
```

* ```docker-compose up```
* Start a browser to visit http://qs.prod. If you see the frontpage. You are now all set.

## Later run

1. ```eval $(docker-machine env qs-prod)```
2. ```docker-compose up```

Note: if your image has changed, and you need to rebuild ONLY one image, you could do this by ```docker-compose build NAME```

# Tips about Git-Subtree

> For more information, you could visit (Git subtree: the alternative to Git submodule)[https://www.atlassian.com/blog/git/alternatives-to-git-submodule-git-subtree]

* First you need to set up remotes:

```
git remote add api git@github.com:stack360/quicksilver_api
git remote add web git@github.com:stack360/quicksilver-web
```

* Then you could pull/push from these upstreams:

```
git subtree pull --prefix api api master --squash
git subtree push --prefix api api master --squash
```

* And everything else is just normal git, ENJOY!


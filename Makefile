# imageName = cdApi
# image:
#	docker image build -t ${imageName} .
#	docker push ${imageName}

#stop-dev:
#	docker-compose --f docker-compose.yml -f docker-compose-dev.yml down

run-dev:
	# docker-compose --f docker-compose.yml -f docker-compose-dev.yml up
	docker-compose --f docker-compose.yml up
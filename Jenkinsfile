pipeline {
  agent any
  environment {
    REGISTRY_HOST = credentials('docker-registry-host')
    REGISTRY_HOST_REMOTE = credentials('docker-registry-domain')
    JENKINS_SERVER = credentials('jenkins-server')
    GIT_REPO_NAME = env.GIT_URL.replaceFirst(/^.*\/([^\/]+?).git$/, '$1').toLowerCase().trim()
    SLACK_CHANNEL = ''
  }

  stages {
    stage ('Check build') {
      when { changeRequest() }

      steps {
        build_pr('unistory-node', 16)
      }
    }

    stage('Build') {
      when {
        allOf {
          not {
            changeRequest()
          }
          anyOf {
            branch 'master'
            branch 'main'
            branch 'dev'
            branch 'development'
          }
        }
      }

      steps {
        build_image()
        script {
          if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == "main") {
            notify_slack('Production build success')
          }
        }
      }
    }

    stage('Start') {
      parallel {
        stage('Prod') {
          when {
            allOf {
              not {
                changeRequest()
              }
              anyOf {
                branch 'main'
                branch 'master'
              }
            }
          }

          stages {
            stage('Approve') {
              input {
                message 'Deploy this build?'
                ok 'Yes'
                submitter ', alukashenko, nbobkov'
              }

              environment {
                LOKI = credentials('LOKI')
                DOCKER = credentials('DOCKER')
                SSH_PROFILE = ''
                COMPOSE_PROJECT_NAME = ''
                FOLDER = 'frontend'
                DOMAIN = ''
                PRODUCTION_URL = ''
                ENV_FILE = '.env.production'
              }

              steps {
                sh '''
                  ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $SSH_PROFILE bash -c "'
                    mkdir -p $FOLDER
                  '"

                  scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no docker-compose.prod.yml $SSH_PROFILE:$FOLDER
                  scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no ${ENV_FILE} $SSH_PROFILE:$FOLDER

                  ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $SSH_PROFILE \
                    bash -c "'
                      cd $FOLDER
                      echo GIT_REPO_NAME=$GIT_REPO_NAME >> ${ENV_FILE}
                      echo REGISTRY_HOST_REMOTE=$REGISTRY_HOST_REMOTE >> ${ENV_FILE}
                      echo BRANCH_NAME=$BRANCH_NAME >> ${ENV_FILE}
                      echo COMPOSE_PROJECT_NAME=$COMPOSE_PROJECT_NAME >> ${ENV_FILE}
                      echo LOKI_USR=$LOKI_USR >> ${ENV_FILE}
                      echo LOKI_PSW=$LOKI_PSW >> ${ENV_FILE}
                      echo DOMAIN=$DOMAIN >> ${ENV_FILE}
                      echo $DOCKER_PSW > .docker_password
                      cat .docker_password | docker login $REGISTRY_HOST_REMOTE -u $DOCKER_USR --password-stdin
                      docker compose -f docker-compose.prod.yml --env-file ${ENV_FILE} pull
                      docker compose -f docker-compose.prod.yml --env-file ${ENV_FILE} up -d
                    '"

                  git restore ${ENV_FILE}
                '''
                notify_slack("Production deployment success")
              }
            }
          }
        }

        stage('Dev') {
          when {
            allOf {
              not {
                changeRequest()
              }
              anyOf {
                branch 'dev'
                branch 'development'
              }
            }
          }

          environment {
            COMPOSE_PROJECT_NAME = 'socialfi'
            ENV_FILE = '.development.env'
          }

          steps {
            script {
              sh """
                echo REGISTRY_HOST=${REGISTRY_HOST} >> ${ENV_FILE}
                echo GIT_REPO_NAME=${GIT_REPO_NAME} >> ${ENV_FILE}
                echo BRANCH_NAME=${BRANCH_NAME} >> ${ENV_FILE}
                echo COMPOSE_PROJECT_NAME=${COMPOSE_PROJECT_NAME} >> ${ENV_FILE}

                if [ "\$(docker-compose port traefik 80)" ]; then
                  IMAGE_PREVIOUS_PORT="\$(docker-compose port traefik $IMAGE_EXPOSED_PORT | egrep "[0-9]+\$" -o)"
                fi

                if [ -z "\${IMAGE_PREVIOUS_PORT}" ]; then
                  WEB_PORT=80 \
                    docker-compose --env-file ${ENV_FILE} up -d
                else
                  WEB_PORT="\${IMAGE_PREVIOUS_PORT}:80" \
                    docker-compose --env-file ${ENV_FILE} up -d
                fi
              """
            }
            notify_slack("Traefik startup success")
          }
        }
      }
    }
  }

  post {
    failure {
      script {
        if (
          env.BRANCH_NAME == "dev" ||
          env.BRANCH_NAME == "development" ||
          env.BRANCH_NAME == "master" ||
          env.BRANCH_NAME == "main"
         ) {
          notify_slack('Build failure')
        }
      }
    }
  }
}


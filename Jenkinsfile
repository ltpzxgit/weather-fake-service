pipeline {
    agent any

    environment {
        DOCKER_USER   = 'lattapon2540'   // <-- แก้เป็น user docker hub จริง
        IMAGE_NAME    = "${DOCKER_USER}/weather-fake-service"
        MANIFEST_REPO = 'https://github.com/ltpzxgit/weather-manifests.git' // <-- เปลี่ยนให้ตรง
        MANIFEST_DIR  = 'manifests'
        IMAGE_TAG     = ''
    }

    stages {
        stage('Checkout Source') {
            steps {
                checkout scm
                script {
                    IMAGE_TAG = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    echo "IMAGE_TAG = ${IMAGE_TAG}"
                }
            }
        }

        stage('Install & Test') {
            steps {
                sh '''
                  npm install
                  npm test
                '''
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER_NAME', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                      echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER_NAME" --password-stdin

                      docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                      docker push ${IMAGE_NAME}:${IMAGE_TAG}

                      docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                      docker push ${IMAGE_NAME}:latest
                    '''
                }
            }
        }

        stage('Update Manifests Repo') {
            steps {
                dir(MANIFEST_DIR) {
                    deleteDir()
                }
                withCredentials([usernamePassword(credentialsId: 'github-creds', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                    sh """
                      git clone https://${GIT_USER}:${GIT_TOKEN}@${MANIFEST_REPO.replace('https://', '')} ${MANIFEST_DIR}
                    """
                }

                script {
                    sh """
                      cd ${MANIFEST_DIR}/weather-service/prod
                      sed -i 's#image: .*#image: ${IMAGE_NAME}:${IMAGE_TAG}#' deployment.yaml

                      git config user.email "ci@local"
                      git config user.name "Jenkins CI"

                      git status
                      git commit -am "Update weather-service image to ${IMAGE_NAME}:${IMAGE_TAG}" || echo "No changes to commit"
                      git push origin main || echo "No changes to push"
                    """
                }
            }
        }
    }
}

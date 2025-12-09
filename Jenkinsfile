pipeline {
    agent any

    environment {
        DOCKER_USER   = 'lattapon2540'                   // <-- แก้
        IMAGE_NAME    = "${DOCKER_USER}/weather-fake-service"
        MANIFEST_REPO = 'https://github.com/ltpzxgit/weather-manifests.git' // <-- แก้
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
                script {
                    docker.withRegistry('', 'dockerhub-creds') {
                        def img = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                        img.push()
                        // อยาก push latest ด้วยก็ได้
                        img.push('latest')
                    }
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

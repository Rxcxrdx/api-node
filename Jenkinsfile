pipeline {
  agent any

  environment {
    ACR_LOGIN_SERVER = 'devopslab01acr.azurecr.io'
    APP_NAME         = 'api-node'
    DEPLOYMENT_NAME  = 'api-node'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test') {
      steps {
        sh 'npm ci'
        sh 'npm test'
      }
    }

    stage('Build imagen') {
      steps {
        sh """
          docker build --platform linux/amd64 \
            -t ${ACR_LOGIN_SERVER}/${APP_NAME}:${BUILD_NUMBER} \
            -t ${ACR_LOGIN_SERVER}/${APP_NAME}:latest \
            .
        """
      }
    }

    stage('Push a ACR') {
      when { branch 'dev' }
      steps {
        withCredentials([usernamePassword(credentialsId: 'acr-creds', usernameVariable: 'ACR_USER', passwordVariable: 'ACR_PASS')]) {
          sh 'echo "$ACR_PASS" | docker login "$ACR_LOGIN_SERVER" -u "$ACR_USER" --password-stdin'
          sh "docker push ${ACR_LOGIN_SERVER}/${APP_NAME}:${BUILD_NUMBER}"
          sh "docker push ${ACR_LOGIN_SERVER}/${APP_NAME}:latest"
        }
      }
    }

    stage('Deploy a AKS') {
      when { branch 'dev' }
      steps {
        withKubeConfig([credentialsId: 'kubeconfig-aks']) {
          sh "kubectl set image deployment/${DEPLOYMENT_NAME} ${DEPLOYMENT_NAME}=${ACR_LOGIN_SERVER}/${APP_NAME}:${BUILD_NUMBER}"
          sh "kubectl rollout status deployment/${DEPLOYMENT_NAME} --timeout=180s"
        }
      }
    }
  }

  post {
    always {
      sh "docker rmi ${ACR_LOGIN_SERVER}/${APP_NAME}:${BUILD_NUMBER} ${ACR_LOGIN_SERVER}/${APP_NAME}:latest || true"
    }
    success {
      echo "OK: ${APP_NAME} build #${BUILD_NUMBER} desplegado en AKS (deployment/${DEPLOYMENT_NAME})"
    }
    failure {
      echo "FALLÓ: ${APP_NAME} build #${BUILD_NUMBER} — revisar el stage que cortó arriba en el log"
    }
  }
}

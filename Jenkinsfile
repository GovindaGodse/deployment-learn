pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }

        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
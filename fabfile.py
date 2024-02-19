from fabric.api import run, env, task, cd, put
from fabric.colors import green
from fabric.contrib.project import upload_project

def msg(input):
    print(green('#' * 40))
    print(green("# %s" % input))
    print(green('#' * 40))

def generate_env_string(env_dict):
    result = []
    for key, value in env_dict.items():
        result.append('%s="%s"' % (key, value))
    return "\n".join(result)


@task
def prodconfig():
    env.hosts = '178.44.126.190:18990'
    env.user = 'root'
    env.password = 'Lfewfw7kef7iflgf23j23fkf'
    env.project_path = '/var/www/b24/monitoring-frontend'
    env.git_branch = 'master'




@task
def devconfig():
    env.hosts = '178.44.126.190:18990'
    env.user = 'root'
    env.password = 'Lfewfw7kef7iflgf23j23fkf'
    env.project_path = '/var/www/b24/dev-monitoring-frontend'
    env.git_branch = 'dev'




@task
def deploy():
    with cd(env.project_path):
        msg('[git] pull')
        run('git fetch origin')
        run('git switch %s' % env.git_branch)
        run('git reset --hard origin/%s' % env.git_branch)
        run('git pull --rebase origin %s' % env.git_branch)

        msg('[frontend] build')
        run('docker run --volume "$(pwd)":/app node:16-alpine /bin/sh -c "cd /app && npm i && npm run build"')


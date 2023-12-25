# 
# Creates variables that are needed by the android build workflow
#

REQUIRED_VARIABLES=(
  REPO_REL_PATH 
  APP_REL_PATH 
  APK_RELEASE_DIR_REL_PATH 
  APP_RELEASE_FILENAME
)

for env_var in ${REQUIRED_VARIABLES[*]}; do
  if [ -z "${!env_var}" ]; then
    echo "Error: ${env_var} is required for this script"
    exit 1
  fi
done

date_string="$(date +'%Y-%m-%dT-%H-%M-%S')"

commit_hash="$(git rev-parse --short HEAD)"

file_identifier="${date_string}-${commit_hash}"

source_folder_relpath_arr=(
  "${REPO_REL_PATH}"
  "${APP_REL_PATH}"
  "${APK_RELEASE_DIR_REL_PATH}"
)
source_folder_relpath=$(IFS='/'; echo "${source_folder_relpath_arr[*]}")

source_file_relpath_arr=(
  "${source_folder_relpath}"
  "${APP_RELEASE_FILENAME}"
)
source_file_relpath=$(IFS='/'; echo "${source_file_relpath_arr[*]}")

for i in \
  commit_hash \
  date_string \
  file_identifier \
  source_file_relpath \
  source_folder_relpath;
do 
  echo "Setting: $i=${!i}"
  echo "$i=${!i}" >> $GITHUB_OUTPUT;
done

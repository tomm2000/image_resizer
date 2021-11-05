from resizer_lib import resize
from PIL import Image
import os
import sys

# print( 'Number of arguments:', len(sys.argv), 'arguments.')
# print( 'Argument List:', str(sys.argv))

if(len(sys.argv) != 4):
  print('[ERROR] too many/few arguments!')
  quit()

path = sys.argv[1]

# print(path)

aspect = (
  int(sys.argv[2], 10),
  int(sys.argv[3], 10)
)

images = os.listdir(path)

# print(images)

dest = path + "/converted"

try:
  os.mkdir(dest)
  # print('#INFO creating dest folder...')
except FileExistsError:
  pass
  # print('#INFO dest folder already exists')

count = 0
for image in images:
  if image.endswith('.jpg') or image.endswith('.png') or image.endswith('.JPG') or image.endswith('.PNG'):
    count += 1
    img = Image.open(f"{path}/{image}")
    img = resize(img, aspect[0]/aspect[1])
    img.save(f"{path}/converted/conv_{image}")

print(f"[PY-INFO] converted {count} images")
quit()



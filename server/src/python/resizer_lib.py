from os import altsep
from PIL import Image

def resize(image, new_ratio):
  ratio = round(image.size[0]/image.size[1], 3)
  new_ratio = round(new_ratio, 3)

  # print(f"#INFO converting ration, r: {ratio} | n: {new_ratio}")

  if(ratio > new_ratio):
    return _resize_vertical(image, new_ratio)
  elif(ratio < new_ratio):
    return _resize_horizontal(image, new_ratio)
  else:
    return image


def _resize_vertical(image, new_ratio):
  width  = image.size[0]
  height = image.size[1]
  desired_height = int(width / new_ratio)
  margin = int((height-desired_height)/2)

  # print(margin)

  background = Image.new('RGB', (width, desired_height), (255, 255, 255))

  background.paste(image, (0, -margin))

  return background

def _resize_horizontal(image, new_ratio):
  width  = image.size[0]
  height = image.size[1]
  desired_width = int(height * new_ratio)
  margin = int((width-desired_width)/2)

  background = Image.new('RGB', (desired_width, height), (255, 255, 255))

  background.paste(image, (-margin, 0))

  return background
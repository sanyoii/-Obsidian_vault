---
title: "roboflow/supervision: We write your reusable computer vision tools. 💜"
source: "https://github.com/roboflow/supervision?fbclid=IwY2xjawRyAgVleHRuA2FlbQIxMABicmlkETE0MWRDV3BWNWV0cVlHdmJCc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHrOd7vBmwSYWCz3QA_l1xyXIK8vEbb0pxib7PtPJrFaowMb3fx-3_mvB5-ls_aem_8P11pAmiwHatAQHgB_DiRw"
author:
published:
created: 2026-05-14
description: "We write your reusable computer vision tools. 💜. Contribute to roboflow/supervision development by creating an account on GitHub."
tags:
  - "clippings"
---
## 👋 hello

**We are your essential toolkit for computer vision.** From data loading to real-time zone counting, we provide the building blocks so you can focus on building applications around your models. 🤝

## 💻 install

Pip install the supervision package in a [**Python>=3.9**](https://www.python.org/) environment.

```
pip install supervision
```

Read more about conda, mamba, and installing from source in our [guide](https://roboflow.github.io/supervision/).

## 🔥 quickstart

### models

Supervision was designed to be model agnostic. Just plug in any classification, detection, or segmentation model. For your convenience, we have created [connectors](https://supervision.roboflow.com/latest/detection/core/#detections) for the most popular libraries like Ultralytics, Transformers, MMDetection, or Inference. Other integrations, like `rfdetr`, already return `sv.Detections` directly.

Install the optional dependencies for this example with `pip install pillow rfdetr`.

```
import supervision as sv
from PIL import Image
from rfdetr import RFDETRSmall

image = Image.open(...)
model = RFDETRSmall()
detections = model.predict(image, threshold=0.5)

len(detections)
# 5
```
👉 more model connectors
- inference
	Running with [Inference](https://github.com/roboflow/inference) requires a [Roboflow API KEY](https://docs.roboflow.com/api-reference/authentication#retrieve-an-api-key).
	```
	import supervision as sv
	from PIL import Image
	from inference import get_model
	image = Image.open(...)
	model = get_model(model_id="rfdetr-small", api_key="ROBOFLOW_API_KEY")
	result = model.infer(image)[0]
	detections = sv.Detections.from_inference(result)
	len(detections)
	# 5
	```

### annotators

Supervision offers a wide range of highly customizable [annotators](https://supervision.roboflow.com/latest/detection/annotators/), allowing you to compose the perfect visualization for your use case.

```
import cv2
import supervision as sv

image = cv2.imread(...)
detections = sv.Detections(...)

box_annotator = sv.BoxAnnotator()
annotated_frame = box_annotator.annotate(scene=image.copy(), detections=detections)
```

1.00

supervision-0.16.0-annotators.mp4<video src="https://private-user-images.githubusercontent.com/26109316/276552454-691e219c-0565-4403-9218-ab5644f39bce.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzg3MjE4MDMsIm5iZiI6MTc3ODcyMTUwMywicGF0aCI6Ii8yNjEwOTMxNi8yNzY1NTI0NTQtNjkxZTIxOWMtMDU2NS00NDAzLTkyMTgtYWI1NjQ0ZjM5YmNlLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA1MTQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNTE0VDAxMTgyM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTNjZDYzNTBmMmM5MzYxZGUyNjg3NzFlNzFkZjZmNGE4ZTBjOGNkNDQ2ZmI3YTdmMzBlZGQ5YzljODA1Y2NlMDMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT12aWRlbyUyRm1wNCJ9.aDf6SYOqU3oPpngac1dk0vj8oM0p091_nnmMRBPKjFo" controls="controls"></video>

### datasets

Supervision provides a set of [utils](https://supervision.roboflow.com/latest/datasets/core/) that allow you to load, split, merge, and save datasets in one of the supported formats.

```
import supervision as sv
from roboflow import Roboflow

project = Roboflow().workspace("WORKSPACE_ID").project("PROJECT_ID")
dataset = project.version("PROJECT_VERSION").download("coco")

ds = sv.DetectionDataset.from_coco(
    images_directory_path=f"{dataset.location}/train",
    annotations_path=f"{dataset.location}/train/_annotations.coco.json",
)

path, image, annotation = ds[0]
# loads image on demand

for path, image, annotation in ds:
    # loads image on demand
    pass
```
👉 more dataset utils
- load
	```
	dataset = sv.DetectionDataset.from_yolo(
	    images_directory_path=...,
	    annotations_directory_path=...,
	    data_yaml_path=...,
	)
	dataset = sv.DetectionDataset.from_pascal_voc(
	    images_directory_path=...,
	    annotations_directory_path=...,
	)
	dataset = sv.DetectionDataset.from_coco(
	    images_directory_path=...,
	    annotations_path=...,
	)
	```
- split
	```
	train_dataset, test_dataset = dataset.split(split_ratio=0.7)
	test_dataset, valid_dataset = test_dataset.split(split_ratio=0.5)
	len(train_dataset), len(test_dataset), len(valid_dataset)
	# (700, 150, 150)
	```
- merge
	```
	ds_1 = sv.DetectionDataset(...)
	len(ds_1)
	# 100
	ds_1.classes
	# ['dog', 'person']
	ds_2 = sv.DetectionDataset(...)
	len(ds_2)
	# 200
	ds_2.classes
	# ['cat']
	ds_merged = sv.DetectionDataset.merge([ds_1, ds_2])
	len(ds_merged)
	# 300
	ds_merged.classes
	# ['cat', 'dog', 'person']
	```
- save
	```
	dataset.as_yolo(
	    images_directory_path=...,
	    annotations_directory_path=...,
	    data_yaml_path=...,
	)
	dataset.as_pascal_voc(
	    images_directory_path=...,
	    annotations_directory_path=...,
	)
	dataset.as_coco(
	    images_directory_path=...,
	    annotations_path=...,
	)
	```
- convert
	```
	sv.DetectionDataset.from_yolo(
	    images_directory_path=...,
	    annotations_directory_path=...,
	    data_yaml_path=...,
	).as_pascal_voc(
	    images_directory_path=...,
	    annotations_directory_path=...,
	)
	```

## 🎬 tutorials

Want to learn how to use Supervision? Explore our [how-to guides](https://supervision.roboflow.com/develop/how_to/detect_and_annotate/), [end-to-end examples](https://github.com/roboflow/supervision/blob/develop/examples), [cheatsheet](https://roboflow.github.io/cheatsheet-supervision/), and [cookbooks](https://supervision.roboflow.com/develop/cookbooks/)!

[![Dwell Time Analysis with Computer Vision | Real-Time Stream Processing](https://private-user-images.githubusercontent.com/6035284/580088646-014cffc7-72b3-4c0a-bb89-6de265b2c06b.jpg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzg3MjE4MDMsIm5iZiI6MTc3ODcyMTUwMywicGF0aCI6Ii82MDM1Mjg0LzU4MDA4ODY0Ni0wMTRjZmZjNy03MmIzLTRjMGEtYmI4OS02ZGUyNjViMmMwNmIuanBnP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDUxNCUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjA1MTRUMDExODIzWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NDU4NmQzY2Y0MTQ2M2ZhMzA5YzlkOTI1NzVlMjc1ZGJiNGM0YzliYjU4Mjk4MzIzYjc4NTA0Nzc3NzQ0YWQ5OCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmcmVzcG9uc2UtY29udGVudC10eXBlPWltYWdlJTJGanBlZyJ9.QoD8DritPHToCycoQuqEuvH19IWMEuLkfBN2ty2KSj0)](https://youtu.be/hAWpsIuem10 "Dwell Time Analysis with Computer Vision | Real-Time Stream Processing") [**Dwell Time Analysis with Computer Vision | Real-Time Stream Processing**](https://youtu.be/hAWpsIuem10 "Dwell Time Analysis with Computer Vision | Real-Time Stream Processing")

**Created: 5 Apr 2024**

  
Learn how to use computer vision to analyze wait times and optimize processes. This tutorial covers object detection, tracking, and calculating time spent in designated zones. Use these techniques to improve customer experience in retail, traffic management, or other scenarios.  

[![Speed Estimation & Vehicle Tracking | Computer Vision | Open Source](https://private-user-images.githubusercontent.com/6035284/580088645-b16b8e21-dc6c-4a73-a678-2f7d5d374793.jpg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzg3MjE4MDMsIm5iZiI6MTc3ODcyMTUwMywicGF0aCI6Ii82MDM1Mjg0LzU4MDA4ODY0NS1iMTZiOGUyMS1kYzZjLTRhNzMtYTY3OC0yZjdkNWQzNzQ3OTMuanBnP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDUxNCUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjA1MTRUMDExODIzWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MmQ5OGE1ODdmOTUzNTY2NjdiZGU4N2U5MTYzODFmNDhjNTk1ZGE4MzZhNzJjMTI5NTMzNTc1N2MyZWFlY2I0MyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmcmVzcG9uc2UtY29udGVudC10eXBlPWltYWdlJTJGanBlZyJ9.N4bXWLLbr-GGGgOCKrGOkLWaW59htmNeU5H0KK4z5l8)](https://youtu.be/uWP6UjDeZvY "Speed Estimation & Vehicle Tracking | Computer Vision | Open Source") [**Speed Estimation & Vehicle Tracking | Computer Vision | Open Source**](https://youtu.be/uWP6UjDeZvY "Speed Estimation & Vehicle Tracking | Computer Vision | Open Source")

**Created: 11 Jan 2024**

  
Learn how to track and estimate the speed of vehicles using YOLO, ByteTrack, and Roboflow Inference. This comprehensive tutorial covers object detection, multi-object tracking, filtering detections, perspective transformation, speed estimation, visualization improvements, and more.

## 💜 built with supervision

Did you build something cool using supervision? [Let us know!](https://github.com/roboflow/supervision/discussions/categories/built-with-supervision)

1.00

football-players-tracking-25.mp4<video src="https://private-user-images.githubusercontent.com/26109316/207858600-ee862b22-0353-440b-ad85-caa0c4777904.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzg3MjE4MDMsIm5iZiI6MTc3ODcyMTUwMywicGF0aCI6Ii8yNjEwOTMxNi8yMDc4NTg2MDAtZWU4NjJiMjItMDM1My00NDBiLWFkODUtY2FhMGM0Nzc3OTA0Lm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA1MTQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNTE0VDAxMTgyM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTdmNTg1NjNjMWIyYTFjNjVhZDhlYmM3Njg3ODJiM2Y5NGY4YmY4MTI0NmE3OWIyOTUzNDYzZDNhZGViM2NmNzEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT12aWRlbyUyRm1wNCJ9.nAw7Efo7YCtViSSZjCRh6pvqC-OZrArbAfaX6M5Oa9o" controls="controls"></video>

1.00

traffic\_analysis\_result.mov<video src="https://private-user-images.githubusercontent.com/26109316/265538033-c9436828-9fbf-4c25-ae8c-60e9c81b3900.mov?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzg3MjE4MDMsIm5iZiI6MTc3ODcyMTUwMywicGF0aCI6Ii8yNjEwOTMxNi8yNjU1MzgwMzMtYzk0MzY4MjgtOWZiZi00YzI1LWFlOGMtNjBlOWM4MWIzOTAwLm1vdj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA1MTQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNTE0VDAxMTgyM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTI4NzU0ZDJhODViMjNkZGRkMTk3NTUwYTQ0YjI1YjhlYjNjZGVkMDk5YmM2ZjA3OGRmOGFhM2M3MDhlOTliNjYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT12aWRlbyUyRnF1aWNrdGltZSJ9.rOIspCFittdZ1ihWWJxNzcTHE1DlfYhivu0Z5N9jt0Q" controls="controls"></video>

1.00

vehicles-step-7-new.mp4<video src="https://private-user-images.githubusercontent.com/26109316/297419069-3ac6982f-4943-4108-9b7f-51787ef1a69f.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzg3MjE4MDMsIm5iZiI6MTc3ODcyMTUwMywicGF0aCI6Ii8yNjEwOTMxNi8yOTc0MTkwNjktM2FjNjk4MmYtNDk0My00MTA4LTliN2YtNTE3ODdlZjFhNjlmLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA1MTQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNTE0VDAxMTgyM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQ5ODVhODVkNjk1Y2QwZTAxYmMxMTY5MWQ0Y2I2ZTUwNDA3Y2EwODE5ZDY1MGEyZmQ5NDAyNmI4YmE5ODE5N2UmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT12aWRlbyUyRm1wNCJ9.ho3uoQ2xFfJA5V6oqJVSBlOT_aEkNWaZNT7WqoVP_pQ" controls="controls"></video>

## 📚 documentation

Visit our [documentation](https://roboflow.github.io/supervision) page to learn how supervision can help you build computer vision applications faster and more reliably.

## 🏆 contribution

We love your input! Please see our [contributing guide](https://github.com/roboflow/supervision/blob/develop/.github/CONTRIBUTING.md) to get started. Thank you 🙏 to all our contributors!

[![](https://camo.githubusercontent.com/4cecbd19a86587ef00e696aef04cdbefdc72e97a897e0f64eac49d6916790d67/68747470733a2f2f636f6e747269622e726f636b732f696d6167653f7265706f3d726f626f666c6f772f7375706572766973696f6e)](https://github.com/roboflow/supervision/graphs/contributors)
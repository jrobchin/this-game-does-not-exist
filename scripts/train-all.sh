python run_clm.py \
--model_type "gpt2-medium" \
--model_name_or_path "gpt2-medium" \
--train_file "../data/training/all_train.txt" \
--do_train \
--validation_file "../data/training/all_val.txt" \
--do_eval \
--num_train_epochs 5 \
--fp16 \
--output_dir "../data/models/gpt2-all/" \
--per_gpu_train_batch_size 1

## merge duration information
library(tidyverse)
exp <- read_csv('expt/MC/Bosker/bosker-eyetracking/experimental_trials.csv')
dur <- read_csv('expt/MC/Bosker/bosker-eyetracking/audio/stimuli/00durations.csv',col_names = c('audio','audio_duration'))[-1,]

exp2 <- left_join(exp,dur)
exp2 <- exp2 |> mutate(target_onset=target_onset+1500)

write_csv(exp2,file='expt/MC/Bosker/bosker-eyetracking/experimental_trials2.csv',quote='none',escape='none')

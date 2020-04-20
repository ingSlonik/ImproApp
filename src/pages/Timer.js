/**
 * @format
 * @flow
 */

import React, {useState} from 'react';
import KeepAwake from 'react-native-keep-awake';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  Vibration,
} from 'react-native';

import {
  playTik,
  playTak,
  playTen,
  playHalf,
  playRefereeWhistle,
} from '../services/sound';

import {useTimer} from '../services/hooks';
import {useDictionary, useLang, type Lang} from '../services/language';
import {Content, H1, Button, Modal} from '../components/Elements';

export default function Timer() {
  const {lang} = useLang();
  const dict = useDictionary();

  const [showModal, setShowModal] = useState(false);
  const [customTime, setCustomTime] = useState('00:10');

  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [timerFrom, setTimerFrom] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);

  const {time, run, onStart, onStop, onPause} = useTimer(t => {
    playSound(timerFrom, t, sound, lang);
    makeVibration(timerFrom, t, vibration);
  });

  function handleStartTimer(timer: number) {
    onStart(timer);
    setTimerFrom(timer);
  }
  function handlePause() {
    if (run) {
      onPause();
      setPausedTime(time);
    } else {
      onStart(pausedTime);
    }
  }
  function handleStop() {
    onStop();
  }

  return (
    <Content>
      <H1>{dict('improvTimer')}</H1>

      <View
        style={{
          position: 'absolute',
          top: 25,
          right: 16,
          flexDirection: 'row',
        }}>
        <TouchableNativeFeedback onPress={() => setVibration(v => !v)}>
          <Icon
            name={vibration ? 'vibrate' : 'vibrate-off'}
            color="black"
            size={32}
          />
        </TouchableNativeFeedback>
        <View style={{paddingLeft: 16}} />
        <TouchableNativeFeedback onPress={() => setSound(s => !s)}>
          <Icon
            name={sound ? 'volume-high' : 'volume-off'}
            color="black"
            size={32}
          />
        </TouchableNativeFeedback>
      </View>

      <View style={{flexGrow: 1, justifyContent: 'space-between'}}>
        <View style={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 20}}>
              {timerFrom > 0 && <Time>{timerFrom}</Time>}
            </Text>
            {!run && time === 0 && timerFrom > 0 && (
              <View style={{flexDirection: 'row', marginLeft: 16}}>
                <Button onPress={() => handleStartTimer(timerFrom)}>
                  <Icon name="repeat" />
                </Button>
                <View style={{width: 16}} />
                <Button
                  onPress={() => handleStartTimer(Math.round(timerFrom / 2))}>
                  {dict('halfTime')}
                </Button>
              </View>
            )}
          </View>
          <Text style={{fontSize: 100, textAlign: 'center'}}>
            <Time>{Number(time)}</Time>
          </Text>
          {time > 0 && (
            <View style={{flexDirection: 'row'}}>
              <Button onPress={() => handlePause()}>
                <Icon name={run ? 'pause' : 'play'} />
              </Button>
              <View style={{width: 16}} />
              <Button onPress={() => handleStop()}>
                <Icon name={'stop'} />
              </Button>
              <KeepAwake />
            </View>
          )}
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button onPress={() => handleStartTimer(300)}>5:00</Button>
          <View style={{width: 16}} />
          <Button onPress={() => handleStartTimer(120)}>2:00</Button>
          <View style={{width: 16}} />
          <Button onPress={() => handleStartTimer(60)}>1:00</Button>
          <View style={{width: 16}} />
          <Button onPress={() => handleStartTimer(30)}>0:30</Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 16,
          }}>
          <Button onPress={() => setShowModal(true)}>{dict('setTime')}</Button>

          <Modal
            show={showModal}
            onPress={() => {
              setShowModal(false);
              handleStartTimer(getTimeFromString(customTime));
            }}
            onClose={() => setShowModal(false)}
            title={dict('setTime')}
            button={dict('start')}>
            <TextInput
              style={{
                flexGrow: 1,
                borderBottomColor: '#111',
                borderBottomWidth: 1,
                textAlign: 'center',
                marginRight: 16,
                padding: 2,
              }}
              autoFocus
              keyboardType="numeric"
              value={customTime}
              onChangeText={timeString =>
                setCustomTime(getValidCustomTime(timeString))
              }
            />
          </Modal>
        </View>
      </View>
    </Content>
  );
}

function Time({children}) {
  const min = Math.floor(Number(children) / 60);
  const sec = Number(children) % 60;

  return (
    <>
      {min < 10 && '0'}
      {min}:{sec < 10 && '0'}
      {sec}
    </>
  );
}

function playSound(
  timerFrom: number,
  time: number,
  sound: boolean,
  lang: Lang,
) {
  const half = Math.round(timerFrom / 2);
  if (sound) {
    if (time === 0) {
      playRefereeWhistle();
    } else if ([5, 3, 1].includes(time)) {
      playTak();
    } else if ([4, 2].includes(time)) {
      playTik();
    } else if (time === 10) {
      playTen(lang);
    } else if (time === half && time > 0) {
      playHalf(lang);
    }
  }
}

function makeVibration(timerFrom: number, time: number, vibration: boolean) {
  const half = Math.round(timerFrom / 2);
  if (vibration && timerFrom > 0) {
    if ([half, 10, 5, 4, 3, 2, 1].includes(time)) {
      Vibration.vibrate(500);
    }
  }
}

function getTimeFromString(time: string): number {
  const [min, sec] = time.split(':').map(t => parseInt(t, 10));
  if (typeof sec !== 'number') {
    return min;
  } else {
    return min * 60 + sec;
  }
}

function getValidCustomTime(time: string): string {
  if (time.length > 2 && time.charAt(2) !== ':') {
    return `${time.substring(0, 2)}:${time.substring(2)}`;
  } else {
    return time.substring(0, 5);
  }
}

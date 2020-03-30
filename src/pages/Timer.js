/**
 * @format
 * @flow
 */

import React, {useState, useEffect, useRef} from 'react';

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

import {useMounted, useInterval} from '../services/hooks';
import {useDictionary} from '../services/language';

import KeepAwake from 'react-native-keep-awake';

import {Content, H1, Button, Modal} from '../components/Elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Timer() {
  const dict = useDictionary();

  const [showModal, setShowModal] = useState(false);
  const [customTime, setCustomTime] = useState('00:10');

  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [run, setRun] = useState(false);
  const [timerFrom, setTimerFrom] = useState(0);
  const time = useInterval<number>(
    run,
    delay => {
      const newTime = timerFrom - Math.floor(delay / 1000);
      // sound and vibration
      const half = Math.round(timerFrom / 2);
      if (vibration && timerFrom > 0) {
        if ([half, 10, 5, 4, 3, 2, 1].includes(newTime)) {
          Vibration.vibrate(500);
        }
      }
      if (sound) {
        if (newTime === 0) {
          playRefereeWhistle();
        } else if ([5, 3, 1].includes(newTime)) {
          playTak();
        } else if ([4, 2].includes(newTime)) {
          playTik();
        } else if (newTime === 10) {
          playTen();
        } else if (newTime === half && newTime > 0) {
          playHalf();
        }
      }

      if (newTime < 0) {
        setRun(false);
        return 0;
      } else {
        return newTime;
      }
    },
    1000,
    0,
  );

  function handleStartTimer(timer: number) {
    setRun(true);
    setTimerFrom(timer);
  }
  function handlePause() {
    setRun(false);
  }
  function handleStop() {
    setRun(false);
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
            <Time>{time}</Time>
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
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
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
/*
function handleTimer(setTime: number, setTimer: TimerState => TimerState) {
  setTimer(t => {
    clearInterval(t.interval);
    const start = Date.now();

    const interval = setInterval(() => {
      setTimer(timer => {

    }, 1000);

    return {...t, setTime, interval, run: true, time: setTime};
  });
}
*/
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

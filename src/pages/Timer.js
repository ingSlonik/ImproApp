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

import {Content, H1, Button, Modal} from '../components/Elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Timer() {
  const refTimer = useRef(setTimeout(() => {}, 0));
  const [timer, setTimer] = useState<number | null>(null);
  const [pause, setPause] = useState(false);
  const [setTime, setSetTime] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [customTime, setCustomTime] = useState('00:10');

  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);

  const isMounted = useRef(true);
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  const half = Math.round(setTime / 2);

  // set timer
  useEffect(() => {
    clearTimeout(refTimer.current);
    if (timer !== null && timer > 0 && pause === false) {
      refTimer.current = setTimeout(() => {
        isMounted.current && setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimer(null);
    }
  }, [timer, pause]);

  // sound and vibration
  useEffect(() => {
    if (vibration && setTime > 0) {
      if ([half, 10, 5, 4, 3, 2, 1].includes(timer)) {
        Vibration.vibrate(500);
      }
    }
    if (sound && timer !== null) {
      if (timer === 0) {
        playRefereeWhistle();
      } else if ([5, 3, 1].includes(timer)) {
        playTik();
      } else if ([4, 2].includes(timer)) {
        playTak();
      } else if (timer === 10) {
        playTen();
      } else if (timer === half && timer > 0) {
        playHalf();
      }
    }
  }, [half, setTime, sound, timer, vibration]);

  function handleTimer(time) {
    clearTimeout(refTimer.current);
    setPause(false);
    setSetTime(time);
    setTimer(time);
  }

  return (
    <Content>
      <H1>Stopky</H1>

      <View
        style={{
          position: 'absolute',
          top: 25,
          right: 16,
          flexDirection: 'row',
        }}>
        <TouchableNativeFeedback onPress={() => setVibration(!vibration)}>
          <Icon
            name={vibration ? 'vibrate' : 'vibrate-off'}
            color="black"
            size={32}
          />
        </TouchableNativeFeedback>
        <View style={{paddingLeft: 16}} />
        <TouchableNativeFeedback onPress={() => setSound(!sound)}>
          <Icon
            name={sound ? 'volume-high' : 'volume-off'}
            color="black"
            size={32}
          />
        </TouchableNativeFeedback>
      </View>

      <View style={{flexGrow: 1, justifyContent: 'space-between'}}>
        <View style={{flexGrow: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>
            {setTime > 0 && <Time>{setTime}</Time>}
          </Text>
          <Text style={{fontSize: 100, textAlign: 'center'}}>
            <Time>{timer}</Time>
          </Text>
          {timer != null && (
            <View style={{flexDirection: 'row'}}>
              <Button onPress={() => setPause(!pause)}>
                {pause ? 'Pokračovat' : 'Pauza'}
              </Button>
              <View style={{width: 16}} />
              <Button onPress={() => setTimer(null)}>Stop</Button>
            </View>
          )}
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button onPress={() => handleTimer(300)}>5:00</Button>
          <View style={{width: 16}} />
          <Button onPress={() => handleTimer(120)}>2:00</Button>
          <View style={{width: 16}} />
          <Button onPress={() => handleTimer(60)}>1:00</Button>
          <View style={{width: 16}} />
          <Button onPress={() => handleTimer(30)}>0:30</Button>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
          <Button onPress={() => setShowModal(true)}>Nastavit čas</Button>

          <Modal
            show={showModal}
            onPress={() => {
              setShowModal(false);
              handleTimer(getTimeFromString(customTime));
            }}
            onClose={() => setShowModal(false)}
            title="Nastavit čas"
            button="Start">
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
              onChangeText={time => setCustomTime(getValidCustomTime(time))}
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

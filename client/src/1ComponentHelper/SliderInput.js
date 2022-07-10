import {Flex, Box, VStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Slider, SliderTrack, SliderFilledTrack, SliderThumb} from '@chakra-ui/react'
import React, { useState } from "react";
import {Input} from '@chakra-ui/input';

function SliderInput(props) {
  // console.log(props.guess);
  // let sliderGuess = props.guess
  const [value, setValue] = useState(0);
  const handleChange = (value) => {
    setValue(value)
  };
  
    return (
      <VStack>
        <NumberInput step={50} placeholder={'Enter a 4 Digit Number From 0000 to 9999'} keepWithinRange={false} max={9999} maxW='100%' mr='2rem' value={value} onChange={handleChange}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider
          max={9999}
          flex='1'
          focusThumbOnChange={false}
          value={value}
          onChange={handleChange}
          
        >
          <SliderTrack min={50} max={9999}>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize='sm' boxSize='50px' children={value} />
        </Slider>
      </VStack>
    )
}
export default SliderInput;




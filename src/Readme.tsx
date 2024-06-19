import {
  Box,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

import FormErrorImage from '../public/form-errors.png';
import FormImage from '../public/form.png';
import Logo from '../public/ignition-logo-dark.svg';

export const Readme = () => (
  <Box
    maxW='60rem'
    padding='2em'
    bg='white'
  >
    <Image
      src={Logo}
      alt='Ignition logo'
      mb={4}
      width='120px'
    />
    <Stack
      spacing={3}
      mb={6}
    >
      <Heading
        as='h1'
        size='2xl'
        borderBottom='1px'
        borderBottomColor='gray.200'
      >
        Front end coding test
      </Heading>
      <Text fontSize='xl'>
        <Link href='https://ignitionapp.com'>
          Ignition
        </Link>{' '}
        developers use{' '}
        <Link href='https://react.dev'>
          React
        </Link>{' '}
        <Link href='https://typescriptlang.org'>
          TypeScript
        </Link>{'  '}
        <Link href='https://chakra-ui.com'>
          Chakra UI
        </Link>{' '}
        <Link href='https://react-hook-form.com'>
          React Hook Form
        </Link>{' '}
        (RHF) and{' '}
        <Link href='https://zod.dev/'>
          Zod
        </Link>{' '}
        every day. In this coding exercise you&apos;ll be using all of these tools. Basic scaffolding has been set up
        for you so you can hit the ground running.
      </Text>
    </Stack>
    <Stack
      spacing={3}
      mb={6}
    >
      <Heading
        as='h2'
        size='xl'
        borderBottom='1px'
        borderBottomColor='gray.200'
      >
        Exercise
      </Heading>
      <Text>
        You need to build a form that validates data when submit button is pressed with all errors shown to the user as
        presented in the screenshot below.
      </Text>
      <Text>
        We have provided some tests with this project. Use these tests to help shape the UI interactions and write a
        matching zod schema to validate the form. Your task is to write the code that makes tests pass and build UI that
        works as expected.
      </Text>

      <Text>
        Use your imagination when building the form. If you build what is presented in the screenshot, it should be
        sufficient, but if you want to make it fancier - all the more power to you!
      </Text>
      <SimpleGrid
        columns={2}
        spacing={10}
      >
        <Box>
          <Image
            src={FormImage}
            alt='Form'
          />
          <Text as='i'>
            Form
          </Text>
        </Box>
        <Box>
          <Image
            src={FormErrorImage}
            alt='Form with errors'
          />
          <Text as='i'>
            Form with errors
          </Text>
        </Box>
      </SimpleGrid>
    </Stack>

    <Stack
      spacing={3}
      mb={6}
    >
      <Heading
        as='h2'
        size='xl'
        borderBottom='1px'
        borderBottomColor='gray.200'
      >
        Your solution
      </Heading>
      <Text>
        Your solution must be submitted in the form of a CodeSandbox link. Clone this project to start coding away.
      </Text>
      <Text>
        If you choose to code directly in CodeSandbox, there&apos;s nothing else for you to set up. You may have to
        enable a few more panels in the interface to see test and console output.
      </Text>

      <Text>
        If you prefer to work on localhost in your IDE, we leave it to you to figure out all the setup steps. Just keep
        in mind that{' '}
        <Text as='b'>
          final solution must be presented via CodeSandbox
        </Text>
      </Text>
      <Text as='b'>
        All code you submit must be in TypeScript
      </Text>
      <Link
        fontSize='xl'
        mt='24px'
        as={RouterLink}
        to='/form'
      >
        View Form Page
      </Link>
    </Stack>

    <Stack
      spacing={3}
      mb={6}
    >
      <Heading
        as='h2'
        size='xl'
        borderBottom='1px'
        borderBottomColor='gray.200'
      >
        About this test
      </Heading>
      <Text>
        This is an &quot;open book test&quot; - feel free to learn as you go by browsing documentation and any resource
        you can find on the web.{' '}
      </Text>
      <Text>
        Make as many specs pass as you can, but don&apos;t be discouraged if you can&apos;t do it all.
      </Text>
      <Text>
        We expect that you will be able to inspect the code and understand how to run the tests and be able to navigate
        and understand the codebase.{' '}
      </Text>
      <Text>
        This exercise may feel very specific regarding the tools we chose to work with, however they were chosen so that
        you can get a taste of what Ignition Engineers are dealing with on a day-to-day basis. If this is up your alley,
        we&apos;ll be happy to chat with you.{' '}
      </Text>
    </Stack>
  </Box>
);

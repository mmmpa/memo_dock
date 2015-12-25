import * as React from 'react'
import { Link } from 'react-router';

export function createIndexLink(children){
  return <Link to="/w/memos/">{children}</Link>
}

export function createNewMemoLink(children){
  return <Link to="/w/memos/new">{children}</Link>
}

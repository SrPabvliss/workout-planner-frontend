<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/features/auth/context/auth-store'
import router from '@/router'
import { LogOut, User } from 'lucide-vue-next'

const auth = useAuthStore()
auth.loadData()

const logout = () => {
  auth.logout()
  router.push('/login')
}

const { user } = auth
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        className="relative h-8 w-8 rounded-full border border-border"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage
            :src="user?.avatarUrl ? user?.avatarUrl : ''"
            alt="Avatar"
            class="rounded-full"
          />
          <AvatarFallback className="bg-transparent">{{
            `${auth.user?.firstName[0]}${user?.lastName[0]}`
          }}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>
        <div class="flex flex-col">
          <p>
            {{ auth.user?.username }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ auth.user?.email }}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="cursor-pointer">
        <User class="mr-2 h-4 w-4" />
        <span>Profile</span>
      </DropdownMenuItem>
      <DropdownMenuItem class="cursor-pointer" @click="logout">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
